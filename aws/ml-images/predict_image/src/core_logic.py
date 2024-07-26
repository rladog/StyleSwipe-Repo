import boto3
import pandas as pd
import numpy as np
from sklearn.metrics import pairwise_distances
from io import BytesIO, StringIO
import logging
from concurrent.futures import ThreadPoolExecutor
import aiobotocore.session
import asyncio

logger = logging.getLogger()
logger.setLevel(logging.INFO)

s3 = boto3.client('s3')
BUCKET_NAME = 'sagemaker-studio-31b52b60' # Bucket for numpy files
BUCKET_RAW = 'photoscsv'

# Global variables for caching
men_features, women_features, boys_features, girls_features = None, None, None, None
men_product_ids, women_product_ids, boys_product_ids, girls_product_ids = None, None, None, None
fashion_df = None

def load_csv_file():
    logging.info('Loading csv file')
    obj = s3.get_object(Bucket=BUCKET_RAW, Key='data/fashion.csv')
    csv_content = obj['Body'].read().decode('utf-8')
    data = StringIO(csv_content)
    df = pd.read_csv(data)
    return df

async def fetch_npy_file(session, file_key):
    try:
        response = await session.get_object(Bucket=BUCKET_NAME, Key=file_key)
        async with response['Body'] as stream:
            npy_content = await stream.read()
        logging.info(f"Fetched {file_key}, first few bytes: {npy_content[:10]}")
        return np.load(BytesIO(npy_content), allow_pickle=True)
    except Exception as e:
        logger.error(f"Error fetching {file_key}: {e}")
        raise

async def load_npy_files_async(file_keys):
    session = aiobotocore.session.AioSession()
    async with session.create_client('s3', region_name='ap-southeast-1') as client:
        tasks = [fetch_npy_file(client, file_key) for file_key in file_keys]
        results = await asyncio.gather(*tasks, return_exceptions=True)
    return results

def initialize_variables(to_initialize):
    logging.info('Initialising variables')
    global men_features, women_features, boys_features, girls_features
    global men_product_ids, women_product_ids, boys_product_ids, girls_product_ids
    global fashion_df
    features = [men_features, women_features, boys_features, girls_features, \
                men_product_ids, women_product_ids, boys_product_ids, girls_product_ids, \
                fashion_df]

    if to_initialize or not (all(feature is not None and feature.size > 0 for feature in features)):
        
        file_keys = [
            'features/Men_ResNet_features.npy',
            'features/Women_ResNet_features.npy',
            'features/Boys_ResNet_features.npy',
            'features/Girls_ResNet_features.npy',
            'features/Men_ResNet_feature_product_ids.npy',
            'features/Women_ResNet_feature_product_ids.npy',
            'features/Boys_ResNet_feature_product_ids.npy',
            'features/Girls_ResNet_feature_product_ids.npy'
        ]

        loop = asyncio.get_event_loop()
        npy_files = loop.run_until_complete(load_npy_files_async(file_keys))
        
        men_features, women_features, boys_features, girls_features, \
            men_product_ids, women_product_ids, boys_product_ids, girls_product_ids = npy_files
        
        fashion_df = load_csv_file()
        fashion_df["ProductId"] = fashion_df["ProductId"].astype(str)
        logging.info('Variables initialised')        

def get_similar_products_cnn(product_id, num_results):
    global men_features, women_features, boys_features, girls_features
    global men_product_ids, women_product_ids, boys_product_ids, girls_product_ids
    global fashion_df

    logging.info('Getting similar products')
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
    logging.info('Calculating pairwise distances')
    pairwise_dist = pairwise_distances(features, features[doc_id].reshape(1, -1))
    indices = np.argsort(pairwise_dist.flatten())[0:num_results]
    pdists = np.sort(pairwise_dist.flatten())[0:num_results]
    similar_product_ids = [ids_list[i] for i in indices]
    logging.info('Similar products calculated')
    
    data = {'similar_product_ids': similar_product_ids}
    return data

# if __name__ == "__main__":
#     event = {
#         "product_id": '10634',
#         "num_results": 5
#     }
#     context = None
#     print(lambda_handler(event, context))