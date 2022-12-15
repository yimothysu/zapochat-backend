FROM node:16
ARG PORT=8000
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY ./tsconfig.json ./tsconfig.json
COPY ./src ./src
RUN npm run build
EXPOSE ${PORT}
CMD ["npm", "start"]
