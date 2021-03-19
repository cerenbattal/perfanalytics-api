#Dockerfile
# PROD CONFIG
FROM node as prod

WORKDIR /app

COPY package*.json ./

RUN npm install

WORKDIR /

COPY ./package*.json ./

RUN npm install

WORKDIR /app

COPY . .

ENV NODE_ENV=production

CMD [ "npm", "start" ]