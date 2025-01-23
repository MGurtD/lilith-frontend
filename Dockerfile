# Etapa 1: Construcción del proyecto Vue
FROM node:14-alpine as build-stage

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto de los archivos del proyecto
COPY . .

# Construir el proyecto
RUN npm run build

# Etapa 2: Configuración de Nginx para servir la aplicación
FROM nginx:alpine as production-build

# Copiar el archivo de configuración de Nginx
COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf

# Eliminar la página de índice predeterminada de Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copiar los archivos construidos desde la etapa de construcción
COPY --from=build-stage /app/dist /usr/share/nginx/html/

# Exponer el puerto 80
EXPOSE 80

# Iniciar Nginx
ENTRYPOINT ["nginx", "-g", "daemon off;"]