FROM node:lts-alpine as build-stage

ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ARG API_BASE_URL
ENV API_BASE_URL=$API_BASE_URL

RUN mkdir -p /app
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build

FROM nginx:stable-alpine as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 8100
CMD ["nginx", "-g", "daemon off;"]