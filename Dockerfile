FROM nginx:alpine 

WORKDIR /usr/share/nginx/html

COPY ./_static .

EXPOSE 80/tcp

CMD ["nginx", "-g", "daemon off;"]