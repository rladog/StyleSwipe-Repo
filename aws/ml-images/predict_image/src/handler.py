import json
import logging
from core_logic import get_similar_products_cnn

logger = logging.getLogger()
logger.setLevel(logging.INFO)

def lambda_handler(event, context):
    try:
        logger.info('in lambda_handler')
        product_id = event.get('product_id')
        num_results = event.get('num_results')
        summary = get_similar_products_cnn(product_id, num_results)
        simiar_product_ids = summary['similar_product_ids']
        return {
            'statusCode': 200,
            'similar_products': simiar_product_ids,
            'body': json.dumps('successfully predicted items!')
        }
    except ValueError as ve:
        logger.error(ve)
        return {
            'statusCode': 500,
            'body': json.dumps('Bad Request, Invalid value. Ensure product id and num_results are integers.')
        }
    except Exception as e:
        logger.error(e)
        return {
            'statusCode': 500,
            'body': json.dumps('Error processing request')
        }