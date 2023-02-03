FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

USER node

ENTRYPOINT [ "node", "dist/server.js" ]