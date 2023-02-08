FROM node:18-alpine
ADD . /app
WORKDIR /app
RUN apk add --update-cache sqlite
USER node
CMD npm install
