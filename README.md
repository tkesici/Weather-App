# Weather-App
<img src="https://user-images.githubusercontent.com/72649005/213923378-e4e648f8-fa44-4c93-abbb-1dce5660ee8c.png" width="100" height="60"/>
<img src="https://user-images.githubusercontent.com/72649005/216601337-7b5df49d-4d27-4067-b286-eb4beae0fa0b.png" width="60" height ="60"/>
<img src="https://user-images.githubusercontent.com/72649005/216600326-d5f65798-b182-4566-a433-ca2fe7045b51.png" width="60" height ="60"/>
<img src="https://user-images.githubusercontent.com/72649005/216602036-a964b7b0-c7d9-4303-bd86-82f09c2908f5.png" width="106" height ="60"/>
<img src="https://user-images.githubusercontent.com/72649005/216601342-18242286-4e75-45bb-85b2-065643c03cb9.png" width="120" height ="60"/>
<img src="https://user-images.githubusercontent.com/72649005/216601346-b13ed55f-ee03-4282-9a9f-a6581964f193.png" width="197" height ="60"/>
<img src="https://user-images.githubusercontent.com/72649005/216601347-1582fd93-4a27-4998-8f46-118abfa66af0.png" width="60" height ="60"/>
<img src="https://user-images.githubusercontent.com/72649005/216601350-2dd162e6-6890-4066-8aba-aeebd34fe519.png" width="60" height ="60"/>
<img src="https://user-images.githubusercontent.com/72649005/216603130-e8989842-aa7b-4407-ae94-950379e21da4.png" width="120" height ="60"/>
<img src="https://user-images.githubusercontent.com/72649005/216603225-ceca0e30-e6b6-4bb0-996c-c6b1dcce7841.png" width="60" height ="60"/>

<br>

# Application Initialization (Using bash script)

## Deploy with standard configuration
1.0.0 is optional and stands for major, minor and patch consecutively.
```
./deploy.sh || ./deploy sh 1.0.0
```

# Application Initialization (Manually)

### Initialize the package.json
    npm init -y

### Deploy with standard configurations
    ./deploy.sh
    
### Install the required dependencies
```
npm install express nodemon body-parser
```
### Run
```
npm start || node server.js
```
### Dockerize the application
```
docker build -t tk/weatherapp:{$VERSION} .
```
### Run the docker image
```
docker run -d -p 3000:3000  tk/weatherapp:{$VERSION}
```

# Monitoring

### Enable Istio
```
microk8s enable istio
```
### Open the Kiali dashboard
```
microk8s istioctl dashboard kiali
```

<img src="https://user-images.githubusercontent.com/72649005/216605265-169fd9b0-bcb7-4416-b6b9-6ace1849b463.png" width="600" height="350" />

<img src="https://user-images.githubusercontent.com/72649005/213923105-7e55d64a-fbce-4cd0-a71d-6c57a7e77fd4.png" width="600" height="350" />
<img src="https://user-images.githubusercontent.com/72649005/213923178-43417f4d-b93e-42a8-a626-9ec9aa1ed21e.png" width="600" height="350" />
<img src="https://user-images.githubusercontent.com/72649005/213923111-0878e45e-0509-480a-8717-3ee839a5bcdb.png" width="600" height="350" />
