FROM node:18.16.0-alpine

WORKDIR /payment

COPY package.json .

COPY . /payment/

RUN yarn install

RUN yarn build

EXPOSE 3000

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

CMD [ "yarn", "preview" ]