# Construcción
FROM node:20-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --production
COPY . .

# Imagen final
FROM node:20-alpine
WORKDIR /usr/src/app
RUN apk add --no-cache bash
COPY --from=builder /usr/src/app ./
COPY wait-for-it.sh .
RUN chmod +x wait-for-it.sh
EXPOSE 8000
CMD ["./wait-for-it.sh", "mysql-users:3306", "--", "node", "server.js"]
