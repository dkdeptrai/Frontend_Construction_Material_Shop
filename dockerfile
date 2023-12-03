FROM node:18-alpine
ADD . /app
WORKDIR /app
COPY package.json .
RUN npm i
COPY . .
CMD [ "npm", "run", "dev" ]