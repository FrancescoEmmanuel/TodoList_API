FROM node:19-alpine 

WORKDIR /app

COPY package*.json ./


RUN npm i


COPY . /app 

RUN npm run build

COPY package*.json ./
COPY vite.config.js ./
COPY tailwind.config.js ./
COPY postcss.config.js ./


EXPOSE 8080

CMD ["npm", "run", "preview"]

