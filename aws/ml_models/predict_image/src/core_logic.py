import boto3
import pandas as pd
import numpy as np
from sklearn.metrics import pairwise_distances
from io import BytesIO, StringIO


s3 = boto3.client('s3')
BUCKET_NAME = 'sagemaker-studio-31b52b60' # Bucket for numpy files
BUCKET_RAW = 'photoscsv'

def load_csv_file():
    obj = s3.get_object(Bucket=BUCKET_RAW, Key='data/fashion.csv')
    csv_content = obj['Body'].read().decode('utf-8')
    data = StringIO(csv_content)
    df = pd.read_csv(data)
    return df

def load_npy_file(file_key):
    response = s3.get_object(Bucket=BUCKET_NAME, Key=file_key)
    npy_content = response['Body'].read()
    return np.load(BytesIO(npy_content))

# Initialise variables

men_features = load_npy_file('features/Men_ResNet_features.npy')
women_features = load_npy_file('features/Women_ResNet_features.npy')
boys_features = load_npy_file('features/Boys_ResNet_features.npy')
girls_features = load_npy_file('features/Girls_ResNet_features.npy')

men_product_ids = load_npy_file('features/Men_ResNet_feature_product_ids.npy')
women_product_ids = load_npy_file('features/Women_ResNet_feature_product_ids.npy')
boys_product_ids = load_npy_file('features/Boys_ResNet_feature_product_ids.npy')
girls_product_ids = load_npy_file('features/Girls_ResNet_feature_product_ids.npy')

fashion_df = load_csv_file()
fashion_df["ProductId"] = fashion_df["ProductId"].astype(str)

def get_similar_products_cnn(product_id, num_results):
    if(fashion_df[fashion_df['ProductId']==product_id]['Gender'].values[0]=="Men"):
        features = men_features
        ids = men_product_ids
    elif(fashion_df[fashion_df['ProductId']==product_id]['Gender'].values[0]=="Women"):
        features = women_features
        ids = women_product_ids
    elif(fashion_df[fashion_df['ProductId']==product_id]['Gender'].values[0]=="Boys"):
        features = boys_features
        ids = boys_product_ids
    elif(fashion_df[fashion_df['ProductId']==product_id]['Gender'].values[0]=="Girls"):
        features = girls_features
        ids = girls_product_ids

    ids_list = ids.tolist()
    doc_id = ids_list.index(product_id)
    pairwise_dist = pairwise_distances(features, features[doc_id].reshape(1, -1))
    indices = np.argsort(pairwise_dist.flatten())[0:num_results]
    pdists = np.sort(pairwise_dist.flatten())[0:num_results]
    simiar_product_ids = [ids_list[i] for i in indices]
    
    return {'indices': indices, 'pdists': pdists, 'similar_product_ids': simiar_product_ids}
