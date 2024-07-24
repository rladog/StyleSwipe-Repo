import boto3
import pandas as pd
import numpy as np
from sklearn.metrics import pairwise_distances
from io import BytesIO, StringIO
import json
import logging

logger = logging.getLogger()
logger.setLevel(logging.INFO)

s3 = boto3.client('s3')
BUCKET_NAME = 'sagemaker-studio-31b52b60' # Bucket for numpy files
BUCKET_RAW = 'photoscsv'

def load_csv_file():
    logging.info('Loading csv file')
    obj = s3.get_object(Bucket=BUCKET_RAW, Key='data/fashion.csv')
    csv_content = obj['Body'].read().decode('utf-8')
    data = StringIO(csv_content)
    df = pd.read_csv(data)
    return df

def load_npy_file(file_key):
    logging.info('Loading npy file')
    response = s3.get_object(Bucket=BUCKET_NAME, Key=file_key)
    npy_content = response['Body'].read()
    return np.load(BytesIO(npy_content))

# Initialise variables
logging.info('Initialising variables')
empty_arr = np.array([])
np.save('empty.npy', empty_arr)
loaded_array = np.load('empty.npy')

men_features = loaded_array
women_features = loaded_array
boys_features = loaded_array
girls_features = loaded_array

men_product_ids = loaded_array
women_product_ids = loaded_array
boys_product_ids = loaded_array
girls_product_ids = loaded_array

fashion_df = load_csv_file()
fashion_df["ProductId"] = fashion_df["ProductId"].astype(str)

def get_similar_products_cnn(product_id, num_results):
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
    simiar_product_ids = [ids_list[i] for i in indices]
    
    return {'indices': indices, 'pdists': pdists, 'similar_product_ids': simiar_product_ids}

def lambda_handler(event, context):
    logger.info('in lambda_handler')
    summary = get_similar_products_cnn(10634, 5)
    simiar_product_ids = summary['similar_product_ids']
    logger.info(simiar_product_ids)
    return {
        'statusCode': 200,
        'similar_products': simiar_product_ids,
        'body': json.dumps('successfully predicted items!')
    }
    # try:
    #     logger.info('in lambda_handler')
    #     product_id = event.get('product_id')
    #     num_results = event.get('num_results')
    #     summary = get_similar_products_cnn(product_id, num_results)
    #     simiar_product_ids = summary['similar_product_ids']
    #     return {
    #         'statusCode': 200,
    #         'similar_products': simiar_product_ids,
    #         'body': json.dumps('successfully predicted items!')
    #     }
    # except ValueError as ve:
    #     logger.error(ve)
    #     return {
    #         'statusCode': 500,
    #         'body': json.dumps('Bad Request, Invalid value. Ensure product id and num_results are integers.')
    #     }
    # except Exception as e:
    #     logger.error(e)
    #     return {
    #         'statusCode': 500,
    #         'body': json.dumps('Error processing request')
    #     }

# This part ensures that the script runs correctly when executed as a module
if __name__ == "__main__":
    event = {
        "product_id": 10634,
        "num_results": 5
    }
    context = None
    print(lambda_handler(event, context))