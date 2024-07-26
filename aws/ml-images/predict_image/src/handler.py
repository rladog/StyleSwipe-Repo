import logging
import json
from core_logic import get_similar_products_cnn, initialize_variables

logger = logging.getLogger()
logger.setLevel(logging.INFO)
to_initialize = None

def lambda_handler(event, context):
    logger.info('Within lambda_handler')
    to_initialize = event.get("to_initialize", False)
    logging.info(f"to_initialize: {to_initialize}")
    initialize_variables(to_initialize)
    product_id = event["product_id"]
    num_results = event["num_results"]
    
    data = get_similar_products_cnn(product_id, num_results)
    logger.info('Data cnn calculated')
    return {
        'statusCode': 200,
        'body': json.dumps(data)
    }

#   "Similar 4 products": [19372,35233,10633,45604]