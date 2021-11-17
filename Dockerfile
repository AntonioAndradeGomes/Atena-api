FROM node:14.18.1

WORKDIR /app/

COPY . /app/

RUN yarn install --dev \
  && chown -R node:node /app/

USER node

CMD [ "yarn", "dev" ]
