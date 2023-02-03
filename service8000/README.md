# Weather-App v1.0.0
#### A simple weather app using Node.js and Docker
<img src="https://user-images.githubusercontent.com/72649005/213923378-e4e648f8-fa44-4c93-abbb-1dce5660ee8c.png" width="200" height="120" />
<br>

# Application Initialization

## Initialize the package.json
    npm init -y
    
## Install the required dependencies
```
npm install express nodemon body-parser
```
## Run
```
npm start || node server.js
```
# Docker Configurations

## Dockerize the application
```
docker build -t tk/weatherapp:{$VERSION} .
```
## Run the docker image
```
docker run -d -p 3000:3000  tk/weatherapp:{$VERSION}
```

<img src="https://user-images.githubusercontent.com/72649005/213923105-7e55d64a-fbce-4cd0-a71d-6c57a7e77fd4.png" width="600" height="350" />
<img src="https://user-images.githubusercontent.com/72649005/213923178-43417f4d-b93e-42a8-a626-9ec9aa1ed21e.png" width="600" height="350" />
<img src="https://user-images.githubusercontent.com/72649005/213923111-0878e45e-0509-480a-8717-3ee839a5bcdb.png" width="600" height="350" />