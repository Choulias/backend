FROM node:24-alpine
WORKDIR /back
COPY ./package*.json .
COPY . .
RUN npm install

CMD npm install && npm start