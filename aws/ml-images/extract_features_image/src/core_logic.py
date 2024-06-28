import boto3
import pandas as pd
import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing import image_dataset_from_directory
from keras import applications
from io import BytesIO, StringIO
import s3fs
import os
import shutil
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger()

# Setup s3 
s3 = boto3.client('s3')
BUCKET_SAVED = 'sagemaker-studio-31b52b60' # Bucket for numpy files
BUCKET_RAW = 'photoscsv' # Bucket for photos and csv files

# Define directory paths
s3_data = 'data/'
numpy_file_dir = 'features/'
TEMP_DIR = '/tmp/s3_images/'


def load_csv_file():
    obj = s3.get_object(Bucket=BUCKET_RAW, Key='data/fashion.csv')
    logger.info(f'Trying to load CSV file from bucket {BUCKET_RAW} with key data/fashion.csv')
    csv_content = obj['Body'].read().decode('utf-8')
    data = StringIO(csv_content)
    df = pd.read_csv(data)
    return df

fashion_df = load_csv_file()

"""
2. Data Preparation
Subsetting the data into relevant demographics
"""
# Frequency of each gender
gender_counts = fashion_df["Gender"].value_counts()
numMen = gender_counts['Men']
numWomen = gender_counts['Women']
numBoys = gender_counts['Boys']
numGirls = gender_counts['Girls']

""" 
3. Feature extraction using ResNet
"""
# Initialise key variables
img_width, img_height = 224, 224
nb_train_samples = [numMen, numWomen, numBoys, numGirls]
epochs = 50
batch_size = 1
train_data_dir = [f"{s3_data}Footwear/Men/Images/images_with_product_ids/", \
                f"{s3_data}Footwear/Women/Images/images_with_product_ids/",\
                f"{s3_data}Apparel/Boys/Images/images_with_product_ids/",\
                f"{s3_data}Apparel/Girls/Images/images_with_product_ids/"]
features_paths = [f'{numpy_file_dir}Men_ResNet_features.npy', 
                  f'{numpy_file_dir}Women_ResNet_features.npy', \
                  f'{numpy_file_dir}Boys_ResNet_features.npy', \
                  f'{numpy_file_dir}Girls_ResNet_features.npy']
product_id_paths = [f'{numpy_file_dir}Men_ResNet_feature_product_ids.npy', \
                    f'{numpy_file_dir}Women_ResNet_feature_product_ids.npy', \
                    f'{numpy_file_dir}Boys_ResNet_feature_product_ids.npy', \
                    f'{numpy_file_dir}Girls_ResNet_feature_product_ids.npy']
logger.info('initialisation complete')

def upload_numpy_to_s3(np_array, s3_path):
    # Convert numpy array to bytes
    logger.info('uploading numpy array to S3')
    buffer = BytesIO()
    np.save(buffer, np_array)
    buffer.seek(0)
    
    # Upload to S3
    s3.put_object(Bucket=BUCKET_SAVED, Key=s3_path, Body=buffer.getvalue())
    
def create_local_directory_structure(base_path, s3_prefix, fs):
    logger.info('inside creating local directory structure')
    files = fs.ls(f's3://{BUCKET_RAW}/{s3_prefix}') 
    for file in files:
        if file.endswith('/'):
            # Create directory
            os.makedirs(os.path.join(base_path, file[len(s3_prefix):]), exist_ok=True)
        else:
            # Download file
            local_file_path = os.path.join(base_path, file[len(s3_prefix):])
            fs.get(file, local_file_path)

def extract_features():
    logger.info('inside extracting features')
    fs = s3fs.S3FileSystem()
    
    for gender in range(len(nb_train_samples)):
        Itemcodes = []
        rescale = tf.keras.layers.Rescaling(1./255)

        # Create local directory structure and download images
        logger.info(f'Creating local directory structure')
        local_base_path = os.path.join(TEMP_DIR, str(gender))
        create_local_directory_structure(local_base_path, train_data_dir[gender], fs)

        # Loads the ResNet50 model (excluding top final layer, only feature extraction,
        # This requires storage as a file will be downloaded from imagenet)
        model = applications.ResNet50(include_top=False, weights='imagenet')
        logger.info('Model loaded')

        dataset = image_dataset_from_directory(
            local_base_path,
            image_size=(img_width, img_height),
            batch_size=batch_size,
            shuffle=False,
            label_mode=None  # Since class_mode=None in the original code
        )

        logger.info('Dataset created')
        
        # Apply the rescaling to the dataset
        dataset = dataset.map(lambda x: rescale(x))

        # Manually get file paths
        Itemcodes = []
        for root, dirs, files in os.walk(local_base_path):
            for file in files:
                if file.lower().endswith(('.png', '.jpg')):
                    basename = os.path.basename(file)
                    imageid = os.path.splitext(basename)[0]
                    Itemcodes.append(imageid)   
        
        # Uses the pre-trained ResNet50 model to predict (extract) features from the images
        extracted_features = model.predict(dataset, steps= (nb_train_samples[gender] // batch_size))
        extracted_features = extracted_features.reshape((nb_train_samples[gender], 100352))
        
        logger.info('uploading features to S3')
        # Upload numpy arrays directly to S3
        upload_numpy_to_s3(extracted_features, features_paths[gender])
        upload_numpy_to_s3(np.array(Itemcodes), product_id_paths[gender])
        
        shutil.rmtree(local_base_path)
        logger.info('memory cleaned up')

extract_features()