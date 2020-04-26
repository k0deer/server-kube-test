#!/usr/bin/env bash

kubectl delete deployment clientes-v1 -n app
kubectl delete svc clientes -n app 
kubectl delete VirtualService clientes -n app 
