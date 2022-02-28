FROM node:17-alpine3.14

COPY . /build/ordle

WORKDIR /build/ordle

RUN yarn install && \
        yarn build

ENTRYPOINT [ "yarn", "serve", "./build" ]
