#!/bin/sh
VERSION=$1

if [ -z "$1"] ; then
    VERSION=$(npm version patch --no-git-tag-version)
    VERSION=${VERSION#?}
fi

MAJOR=$(node -e "console.log('$VERSION'.split('.')[0] || '0')")
MINOR=$(node -e "console.log('$VERSION'.split('.')[1] || '0')")
PATCH=$(node -e "console.log('$VERSION'.split('.')[2] || '0')")

docker build --tag localhost:32000/8001:$MAJOR.$MINOR.$PATCH .

docker tag localhost:32000/8001:$MAJOR.$MINOR.$PATCH localhost:32000/8001:$MAJOR.$MINOR
docker tag localhost:32000/8001:$MAJOR.$MINOR.$PATCH localhost:32000/8001:$MAJOR
docker tag localhost:32000/8001:$MAJOR.$MINOR.$PATCH localhost:32000/8001:latest

docker push localhost:32000/8001:$MAJOR.$MINOR.$PATCH
docker push localhost:32000/8001:$MAJOR.$MINOR
docker push localhost:32000/8001:$MAJOR
docker push localhost:32000/8001:latest

# if kubectl get deployment weatherapp-8001; then
#     echo "Deployment exists"
#     kubectl set image deployment/weatherapp-8001 weatherapp-8001=localhost:32000/8001:$MAJOR.$MINOR.$PATCH
# else
#     echo "Deployment does not exist"
#     kubectl apply -f deployment.yaml
#     kubectl set image deployment/weatherapp-8001 weatherapp-8001=localhost:32000/8001:$MAJOR.$MINOR.$PATCH
#     kubectl expose deployment/weatherapp-8001 --port=80 --target-port=8001 --name=http
# fi

cat <<EOF | kubectl apply -f -
apiVersion: apps/v1
kind: Deployment
metadata:
  name: weatherapp-8001
  labels:
    app: weatherapp-8001
spec:
  replicas: 1
  selector:
    matchLabels:
      app: weatherapp-8001
  template:
    metadata:
      labels:
        app: weatherapp-8001
    spec:
      containers:
      - name: weatherapp-8001
        image: localhost:32000/8001:$MAJOR.$MINOR.$PATCH
        ports:
        - containerPort: 8001
        env:
        - name: APIURL_8000
          value: http://weatherapp-8000:8000
        - name: APIURL_8001
          value: http://weatherapp-8001:8001
        - name: APIURL_8002
          value: http://weatherapp-8002:8002
        - name: APIURL_8003
          value: http://weatherapp-8003:8003
        - name: APIURL_8004
          value: http://weatherapp-8004:8004     
---
apiVersion: v1
kind: Service
metadata:
  name: weatherapp-8001
spec:
  selector:
    app: weatherapp-8001
  ports:
    - protocol: TCP
      port: 8001
      targetPort: 8001
      name: http
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: ingress-8001
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  rules:
  - host: weatherapp-8001.local
    http:
      paths:
      - pathType: Prefix
        path: "/"
        backend:
          service:
            name: weatherapp-8001
            port:
              number: 8001
EOF

echo version @$VERSION deployed