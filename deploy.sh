#!/usr/bin/env bash
# Check if there is instance running with the image name we are deploying
CURRENT_INSTANCE=$(docker ps -a -q --filter ancestor="$IMAGE_NAME" --format="{{.ID}}")
# If an instance does exist stop the instance
if [ "$CURRENT_INSTANCE" ] 
then
  docker rm $(docker stop $CURRENT_INSTANCE)
fi
# Pull down the instance from dockerhub
docker pull $IMAGE_NAME
# Check if a docker container exists with the name of $CONTAINER_NAME if it does remove the container
CONTAINER_EXISTS=$(docker ps -a | grep $CONTAINER_NAME)
if [ "$CONTAINER_EXISTS" ] 
then
  docker rm $CONTAINER_NAME
fi

# Write the private key and server certificate to files with proper formatting
echo "$PRIVATE_KEY" | sed 's/\\n/\n/g' > privatekey.pem
echo "$SERVER" | sed 's/\\n/\n/g' > server.crt

# Verify certificate files exist and have content
if [ ! -s privatekey.pem ] || [ ! -s server.crt ]; then
  echo "Error: Certificate files are empty or not created properly"
  exit 1
fi

# Create a container called $CONTAINER_NAME that is available on port 8443 from our docker image
docker create -p 8443:8443 --name $CONTAINER_NAME $IMAGE_NAME

# Add the private key and server certificate to the container
docker cp ./privatekey.pem $CONTAINER_NAME:/privatekey.pem
docker cp ./server.crt $CONTAINER_NAME:/server.crt

# Start the container
docker start $CONTAINER_NAME

# Clean up local certificate files
rm -f privatekey.pem server.crt

echo "Deployment completed successfully"