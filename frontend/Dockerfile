FROM nginx:1.25.4 as production
ENV NODE_ENV production

COPY build /usr/share/nginx/html/
COPY .nginx /etc/nginx/conf.d/

CMD ["nginx", "-g", "daemon off;"]
