FROM node:lts

WORKDIR /app

COPY ./package.json ./

RUN npm i

COPY . .

ENV DB_URL_DOCKER=mongodb://172.21.0.2:27017

EXPOSE 4444

CMD ["npm", "run", "dev"]