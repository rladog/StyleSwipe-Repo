#!/bin/sh

# Check if the first argument is provided
if [ -z "$1" ]; then
  echo "Handler name is required as the first argument"
  exit 1
fi

# Print the handler name and arguments for debugging
echo "Executing handler: $1 with function: $2"

# Execute the handler and then the function
exec python3 -m $1 $2

# Add debugging information
if [ $? -ne 0 ]; then
  echo "Failed to execute handler: $1 with function: $2"
  exit 1
fi

echo "Handler executed successfully"
