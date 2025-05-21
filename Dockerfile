# Etapa de construcción
FROM node:20 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa de producción con Nginx
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Creamos el subdirectorio 'sistema'
RUN mkdir -p /usr/share/nginx/html/sistema

# Copiamos los archivos generados al subpath
COPY --from=builder /app/dist/ /usr/share/nginx/html/sistema

# Reemplazamos la configuración por una que respete el subpath
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
