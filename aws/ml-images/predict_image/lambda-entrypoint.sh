#!/bin/bash

# Print the handler name for debugging
echo "Executing handler: $1"

# Set the handler and run the AWS Lambda Runtime Interface Client
exec python3 -m awslambdaric $1 

# Add debugging information
if [ $? -ne 0 ]; then
  echo "Failed to execute handler: $1"
  exit 1
fi

echo "Handler executed successfully"
