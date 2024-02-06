FROM node:lts

WORKDIR /app

COPY ./package.json ./

RUN npm i

COPY . .

ENV DB_URL=mongodb://mongo:27017

EXPOSE 4444

CMD ["npm", "run", "start"]