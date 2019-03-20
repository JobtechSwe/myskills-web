FROM node:10.15

ARG REACT_APP_GRAPHQL_URI
ARG REACT_APP_GRAPHQL_WS_URI

COPY package*json /app/

WORKDIR /app

RUN npm ci

COPY tsconfig.json ./
COPY public ./public
COPY src ./src

RUN npm run build

ENV USER=web-user
RUN adduser --disabled-password --gecos "" $USER
USER $USER

EXPOSE 4000

CMD ["sh", "-c", "npx serve --listen 4000 --no-clipboard --single build"]