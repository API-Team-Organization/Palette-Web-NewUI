FROM node:20-alpine
LABEL authors="jombi"

COPY public /app/public
COPY .next/standalone /app/
COPY .next/static /app/.next/static

WORKDIR /app
EXPOSE 3000

ENTRYPOINT ["node", "server.js"]