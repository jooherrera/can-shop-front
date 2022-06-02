FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json .

RUN npm install 

COPY . .

RUN npm run export






FROM nginx:alpine 

WORKDIR /usr/share/nginx/html

COPY --from=builder /app/_static .

EXPOSE 80/tcp

CMD ["nginx", "-g", "daemon off;"]