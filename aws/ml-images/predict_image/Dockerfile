# Use an official AWS Lambda runtime as a parent image
FROM public.ecr.aws/lambda/python:3.11

# Install AWS CLI
RUN yum update -y && \
    yum install -y awscli

# Copy the function code into the container
COPY src/* /var/task/

# Install any dependencies required by the function
COPY requirements.txt .
RUN pip install --default-timeout=120 -r requirements.txt

# Ensure the entry point script is executable
COPY lambda-entrypoint.sh /var/task/lambda-entrypoint.sh
RUN chmod +x /var/task/lambda-entrypoint.sh

# Specify the entrypoint and command to run the Lambda function
ENTRYPOINT ["/var/task/lambda-entrypoint.sh"]
CMD ["handler.lambda_handler"]
