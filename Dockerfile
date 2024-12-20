FROM node:20-alpine
LABEL authors="jombi"
WORKDIR /app

COPY public ./public
COPY .next/standalone ./
COPY .next/static ./.next/static

ENV NODE_ENV=production
EXPOSE 3000

ENTRYPOINT ["node", "server.js"]