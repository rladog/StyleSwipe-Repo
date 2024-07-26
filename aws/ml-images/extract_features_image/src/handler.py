import json
import logging
from core_logic import extract_features

logger = logging.getLogger()
logger.setLevel(logging.INFO)

def lambda_handler(event, context):
    return extract_features()