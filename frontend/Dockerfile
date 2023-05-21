FROM node:14-alpine
RUN mkdir /app
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY . /app
RUN npm install
RUN npm run build

CMD ["npm", "start"]