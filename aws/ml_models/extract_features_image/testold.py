# import boto3
# import time
# import subprocess

# # Initialize the SQS and EC2 clients
# sqs = boto3.client('sqs')
# ec2 = boto3.client('ec2')

# # Define the SQS queue URL and the EC2 instance ID
# queue_url = 'https://sqs.ap-southeast-1.amazonaws.com/471112819437/feature_extraction.fifo'
# instance_id = 'i-006c4d255c11b82d5'

# def process_message(message_body):
#     # Add your processing logic here
#     print(f"Processing message: {message_body}")

#      # Execute a command line instruction
#     command = 'your_command_here'
#     try:
#         result = subprocess.run(command, shell=True, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
#         print(f"Command output: {result.stdout.decode('utf-8')}")
#         print(f"Command error (if any): {result.stderr.decode('utf-8')}")
#     except subprocess.CalledProcessError as e:
#         print(f"An error occurred while executing the command: {e}")

# while True:
#     # Poll the SQS queue for messages
#     response = sqs.receive_message(
#         QueueUrl=queue_url,
#         MaxNumberOfMessages=1,
#         WaitTimeSeconds=10
#     )

#     if 'Messages' in response:
#         # Process each message
#         for message in response['Messages']:
#             process_message(message['Body'])
#             receipt_handle = message['ReceiptHandle']

#             # Delete the message from the queue after processing
#             sqs.delete_message(
#                 QueueUrl=queue_url,
#                 ReceiptHandle=receipt_handle
#             )
#     else:
#         # No messages to process, stop the EC2 instance
#         print('No messages to process, stopping the EC2 instance.')
#         ec2.stop_instances(InstanceIds=[instance_id])
#         break

#     # Optional: Wait before polling the queue again
#     time.sleep(5)

# import boto3
# import json
# import time

# sqs_client = boto3.client('sqs')
# ssm_client = boto3.client('ssm')
# QUEUE_URL = 'https://sqs.ap-southeast-1.amazonaws.com/471112819437/feature_extraction.fifo'

# def run_docker_script(instance_id):
#     response = ssm_client.send_command(
#         InstanceIds=[instance_id],
#         DocumentName='AWS-RunShellScript',
#         Parameters={
#             'commands': [
#                 'docker run -e AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID} '
#                 '-e AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY} '
#                 '471112819437.dkr.ecr.ap-southeast-1.amazonaws.com/my-extract-features:latest'
#             ]
#         },
#     )
#     command_id = response['Command']['CommandId']
    
#     while True:
#         result = ssm_client.get_command_invocation(
#             CommandId=command_id,
#             InstanceId=instance_id
#         )
        
#         status = result['Status']
#         if status in ['Pending', 'InProgress']:
#             time.sleep(10)  # Adjust polling interval as needed
#         else:
#             break
    
#     return result

# def process_messages():
#     while True:
#         response = sqs_client.receive_message(QueueUrl=QUEUE_URL, MaxNumberOfMessages=1, WaitTimeSeconds=20)
#         messages = response.get('Messages', [])
        
#         for message in messages:
#             body = json.loads(message['Body'])
#             instance_id = body['instance_id']
#             task = body['task']
            
#             if task == 'run_docker_script':
#                 result = run_docker_script(instance_id)
#                 print(result)
            
#             sqs_client.delete_message(QueueUrl=QUEUE_URL, ReceiptHandle=message['ReceiptHandle'])

# if __name__ == "__main__":
#     process_messages()
