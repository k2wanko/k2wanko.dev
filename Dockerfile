FROM node:10-jessie-slim

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .

CMD ["npm", "run", "docker:run"]