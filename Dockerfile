FROM node:10-jessie-slim

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .

CMD ["npm", "run", "docker:run"]