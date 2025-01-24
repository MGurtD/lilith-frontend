# Etapa 1: Construcción del proyecto con Node.js
FROM node:18-alpine as build-stage

# Establecer el directorio de trabajo
WORKDIR /app

# Declarar argumentos
ARG VITE_API_APP_NAME
ARG VITE_API_BASE_URL
ARG VITE_API_SERVER_URL
ARG VITE_REPORTS_BASE_URL

# Pasar los argumentos como variables de entorno
ENV VITE_API_APP_NAME=$VITE_API_APP_NAME
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_API_SERVER_URL=$VITE_API_SERVER_URL
ENV VITE_REPORTS_BASE_URL=$VITE_REPORTS_BASE_URL

# Loggear los valores de las variables
RUN echo "VITE_API_APP_NAME: $VITE_API_APP_NAME" && \
    echo "VITE_API_BASE_URL: $VITE_API_BASE_URL" && \
    echo "VITE_API_SERVER_URL: $VITE_API_SERVER_URL" && \
    echo "VITE_REPORTS_BASE_URL: $VITE_REPORTS_BASE_URL"

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm ci

# Copiar el resto de los archivos del proyecto
COPY . .

# Construir el proyecto (genera el directorio dist)
RUN npm run build

# Etapa 2: Configuración de Nginx para servir la aplicación
FROM nginx:alpine as production-stage

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
