FROM node:10.15.3

COPY package*json /app/

WORKDIR /app

RUN npm ci

COPY tsconfig.json ./
COPY public ./public
COPY src ./src

EXPOSE 4000

CMD ["sh", "-c", "npm run build && npx serve --listen 4000 --no-clipboard --single build"]