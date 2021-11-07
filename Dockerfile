FROM node:14.18.1

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --dev

COPY . .

COPY --chown=node:node . .

USER node

EXPOSE 8080

CMD [ "node", "server.ts" ]
