FROM node:17-alpine

WORKDIR /usr/app/backend/root

COPY ./package.json .

RUN npm install 

COPY . .
EXPOSE 8000

CMD [ "npm", "start" ]
