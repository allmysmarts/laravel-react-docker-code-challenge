FROM node:lts-alpine

COPY ./frontend/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 3000
ENTRYPOINT ["/bin/sh", "/entrypoint.sh"]
CMD ["yarn", "start", "--public=http://myapp.com", "--mode=docker", "--emoji=false", "--no-progress"]
