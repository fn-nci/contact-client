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
# Create a container called $CONTAINER_NAME that is available on port 8443 from our docker image
docker create -p 8443:8443 --name $CONTAINER_NAME $IMAGE_NAME
# Write the private key to a file
echo $PRIVATE_KEY > privatekey.pem
# Write the server key to a file
echo $SERVER > server.crt
# Add the private key to the $CONTAINER_NAME docker container
docker cp ./privatekey.pem $CONTAINER_NAME:/privatekey.pem
# Add the server key to the $CONTAINER_NAME docker container
docker cp ./server.crt $CONTAINER_NAME:/server.crt
# start the $CONTAINER_NAME container
docker start $CONTAINER_NAME