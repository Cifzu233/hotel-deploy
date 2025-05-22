# Construcción
FROM node:20-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --production
COPY . .

# Imagen final
FROM node:20-alpine
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app ./
EXPOSE 4000
CMD ["node", "server.js"]
