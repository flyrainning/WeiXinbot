FROM node:latest
MAINTAINER Flyrainning "http://www.fengpiao.net"

  
ADD app /app
WORKDIR /app
RUN npm install

ENV VERSION 1
ENV PATH "/app:$PATH"

EXPOSE 80
ENTRYPOINT ["node /app/index.js"]

