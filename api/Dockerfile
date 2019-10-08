FROM node:11-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY ./ ./
RUN npm run build

EXPOSE 3001

CMD [ "node", "app.js" ]