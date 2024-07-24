import logging
from core_logic import get_similar_products_cnn, initialize_variables

logger = logging.getLogger()
logger.setLevel(logging.INFO)
initialized = None

def lambda_handler(event, context):
    initialized = event.get("initialized", False)
    if not initialized:
        logging.info(f"initialized: {initialized}")
        initialize_variables()
        initialized = True
    product_id = event["product_id"]
    num_results = event["num_results"]
    
    return get_similar_products_cnn(product_id, num_results)

# if __name__ == "__main__":
    # event = {
#     context = None
#     print(lambda_handler(event, context))

#   "Similar 4 products": [19372,35233,10633,45604]