FROM ubuntu:17.10
MAINTAINER Flyrainning "http://www.fengpiao.net"

RUN apt-get update -y \
  && apt-get install -y \
    curl \
  && apt-get autoclean \
  && apt-get autoremove \
  && rm -rf /var/lib/apt/lists/*

RUN curl -sL https://deb.nodesource.com/setup_10.x | bash
RUN apt-get install -y nodejs

ADD app /app
WORKDIR /app
RUN npm install

ENV VERSION 1
ENV PATH "/app:$PATH"

EXPOSE 800
ENTRYPOINT ["node /app/index.js"]
