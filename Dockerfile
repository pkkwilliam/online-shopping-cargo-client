FROM node:14-alpine

RUN mkdir -p /home/app

COPY . /home/app

RUN npm install --prefix /home/app

RUN npm start-prod --prefix /home/app