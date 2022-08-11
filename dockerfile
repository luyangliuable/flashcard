FROM node:18

WORKDIR /code

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3001

ENV PORT=3001

CMD ["npm", "start"]