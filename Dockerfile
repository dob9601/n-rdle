FROM node:buster

COPY . /build/ordle

WORKDIR /build/ordle

RUN yarn install && \
        yarn build

ENTRYPOINT [ "yarn", "serve", "./build" ]
