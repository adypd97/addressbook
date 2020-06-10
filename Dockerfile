FROM node:12.14.1-alpine

ADD ./ca-certificate.crt /usr/local/share/ca-certificates/foo.crt
RUN chmod 644 /usr/local/share/ca-certificates/foo.crt && update-ca-certificates
COPY package*.json ./
RUN npm install

COPY *.js ./

EXPOSE 3000
CMD ["npm", "run" , "start"]
