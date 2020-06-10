FROM node:12.14.1-alpine

COPY package*.json ./
RUN npm install

COPY *.js ./

EXPOSE 3000
CMD ["npm", "run" , "start"]
