FROM node:lts-alpine as builder

WORKDIR /usr/app/client

COPY ./package.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:stable-alpine   

# COPY /build/ /usr/share/nginx/html

EXPOSE 3000