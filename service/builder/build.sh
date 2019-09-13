#!/bin/bash

echo "building image..."
docker build -t centos:latest $1

echo "saving image..."
docker save --output ${1}img/centos_latest.tar centos:latest

echo "deleting image..."
docker rmi centos:latest