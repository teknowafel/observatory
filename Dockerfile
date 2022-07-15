FROM node:alpine

WORKDIR /

RUN apk add --update --no-cache \
    docker \
    curl

RUN mkdir -p /usr/local/lib/docker/cli-plugins

RUN curl -SL https://github.com/docker/compose/releases/download/v2.6.1/docker-compose-linux-x86_64 -o /usr/local/lib/docker/cli-plugins/docker-compose

RUN chmod +x /usr/local/lib/docker/cli-plugins/docker-compose

COPY ./package.json .

RUN npm i

COPY . .

ENTRYPOINT [ "npm", "start" ]

