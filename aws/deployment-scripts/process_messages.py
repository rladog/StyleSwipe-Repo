import boto3
import json
import time
import logging

# Before running this script, ensure that you have your aws credentials in place

# Truncate the log file at the start
with open('/home/ec2-user/process_messages.log', 'w'):
    pass

logging.basicConfig(filename='/home/ec2-user/process_messages.log', level=logging.INFO)

sqs_client = boto3.client('sqs')
ssm_client = boto3.client('ssm')
ec2_client = boto3.client('ec2')
QUEUE_URL = 'https://sqs.ap-southeast-1.amazonaws.com/471112819437/feature_extraction.fifo'
INSTANCE_ID = 'i-006c4d255c11b82d5'

def run_docker_script(instance_id):
    logging.info('Running Docker script on instance %s', instance_id)

    command = (
        "AWS_ACCESS_KEY_ID=$(aws configure get default.aws_access_key_id) "
        "AWS_SECRET_ACCESS_KEY=$(aws configure get default.aws_secret_access_key) "
        "docker run -e AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID} "
        "-e AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY} "
        "471112819437.dkr.ecr.ap-southeast-1.amazonaws.com/my-extract-features:latest"
    )

    response = ssm_client.send_command(
        InstanceIds=[instance_id],
        DocumentName='AWS-RunShellScript',
        Parameters={
            'commands': [command]
        },
    )
    command_id = response['Command']['CommandId']
    
    while True:
        time.sleep(2) # Wait for 2 seconds before execution
        result = ssm_client.get_command_invocation(
            CommandId=command_id,
            InstanceId=instance_id
        )
        
        status = result['Status']
        if status in ['Pending', 'InProgress']:
            logging.info('Command status: %s', status)
            time.sleep(10)  #polling interval
        else:
            logging.info('Command completed with status: %s', status)
            break
    
    return result

def process_messages():
    logging.info('Starting to process messages...')

    while True:
        response = sqs_client.receive_message(QueueUrl=QUEUE_URL, MaxNumberOfMessages=1, WaitTimeSeconds=20)
        messages = response.get('Messages', [])
        
        if not messages:
            logging.info("No more messages. Shutting down.")
            break
        
        for message in messages:
            logging.info('Processing message: %s', message)
            body = json.loads(message['Body'])
            instance_id = body['instance_id']
            task = body['task']
            
            if task == 'run_docker_script':
                result = run_docker_script(instance_id)
            
            sqs_client.delete_message(QueueUrl=QUEUE_URL, ReceiptHandle=message['ReceiptHandle'])
        
        time.sleep(5)  # Sleep briefly to prevent tight looping

    # shutdown_instance(INSTANCE_ID)


def shutdown_instance(instance_id):
    ec2_client.stop_instances(InstanceIds=[instance_id])
    logging.info('Instance %s has been stopped.', instance_id)

if __name__ == "__main__":
    try:
        process_messages()
    except Exception as e:
        logging.error("Error occurred: %s", str(e))
        raise
