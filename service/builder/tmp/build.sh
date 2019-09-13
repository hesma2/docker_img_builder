#!/bin/bash

echo "building image..."
docker build -t osName:osTag $1

echo "saving image..."
docker save --output ${1}img/osName_osTag.tar osName:osTag

echo "deleting image..."
docker rmi osName:osTag