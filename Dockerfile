FROM node:12.14.1-alpine

ADD ca-certificate.crt
RUN chmod 644 ca-certificate.crt && update-ca-certificates
COPY package*.json ./
RUN npm install

COPY *.js ./

EXPOSE 3000
CMD ["npm", "run" , "start"]
