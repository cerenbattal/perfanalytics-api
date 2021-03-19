FROM node:alpine

WORKDIR /app

COPY package.json /app
RUN npm install

COPY . /app

RUN npm build

EXPOSE 3000

CMD [ "npm", "start"]