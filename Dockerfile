FROM --platform=linux/arm64 node:16-slim

WORKDIR /app

COPY package.json package-lock.json ./
COPY . .

RUN npm install

EXPOSE 3000
CMD ["npm", "start"]
