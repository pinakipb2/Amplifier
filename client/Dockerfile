FROM node:alpine

WORKDIR /client

COPY package*.json .

RUN npm ci

COPY . .

EXPOSE 3000

ENV NEXT_TELEMETRY_DISABLED 1

CMD ["npm", "run", "dev"]