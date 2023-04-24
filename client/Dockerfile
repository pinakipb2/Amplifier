FROM node:alpine

WORKDIR /client

COPY package*.json .

RUN npm ci

COPY . .

ENV NODE_ENV production

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]