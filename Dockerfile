FROM node:20-alpine
LABEL authors="jombi"

COPY public ./public
COPY .next/standalone ./
COPY .next/static ./.next/static

EXPOSE 3000

ENTRYPOINT ["node", "server.js"] 