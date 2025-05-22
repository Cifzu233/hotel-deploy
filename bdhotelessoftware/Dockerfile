# Etapa 1: build de dependencias
FROM node:20-alpine AS builder
WORKDIR /usr/src/app

# Copiamos package.json e instalamos
COPY package*.json ./
RUN npm install --production

# Copiamos el resto del código
COPY . .

# Etapa 2: imagen final
FROM node:20-alpine
WORKDIR /usr/src/app

# Copiamos la app ya instalada
COPY --from=builder /usr/src/app ./

# Exponemos el puerto que usa npm start
EXPOSE 5000

# Arrancamos el servidor
CMD ["npm", "start"]
