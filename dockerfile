FROM 'node:12.12.0-alpine'

RUN mkdir -p /usr/app

WORKDIR /usr/app

COPY . .

WORKDIR /usr/app/backend

RUN npm i --quiet

