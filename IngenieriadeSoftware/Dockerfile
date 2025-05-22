# Etapa 1: build de la app React+Vite
FROM node:20-alpine AS build
WORKDIR /usr/src/app

# Instalamos dependencias
COPY package*.json ./
RUN npm install

# Copiamos el código y generamos los assets
COPY . .
RUN npm run build

# Etapa 2: servidor estático con Nginx
FROM nginx:stable-alpine
# Copiamos el build al root de nginx
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Exponemos el puerto 80
EXPOSE 80

# Arrancamos nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]
