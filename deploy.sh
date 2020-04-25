#!/usr/bin/env bash

export PROJECT=rxcore
export CONTAINER_VERSION=v1
export IMAGE_NAME=clientes
export IMAGE=$PROJECT"/"$IMAGE_NAME":"$CONTAINER_VERSION
export BUILD_HOME=.

echo 'Build image ... ' $IMAGE
docker build -t $IMAGE $BUILD_HOME
echo 'Successfully built ' $IMAGE

echo 'Push image ... ' $IMAGE
#push to docker container registry
docker push $IMAGE
echo 'Successfully pushed to Docker Container Registry ' $IMAGE

echo 'Delete old deploy kubernetes ... ' 

#delete old deploy
kubectl delete deployment clientes-v1 
kubectl delete svc clientes-svc

echo 'Successfully deleted ' 

echo 'Apply changes app kubernetes ' 
# apply yaml file

kubectl apply -f "${PWD}/kube/db-mongoatlas-secret.yaml"
kubectl apply -f "${PWD}/kube/clientes.yaml"

echo 'Successfully deploy ' 




