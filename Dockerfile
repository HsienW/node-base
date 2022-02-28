# Dockerfile
FROM node:16.14.0-slim

WORKDIR /usr/app/node-base
COPY . .
RUN yarn

EXPOSE 9000
CMD yarn start
