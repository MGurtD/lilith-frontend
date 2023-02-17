#!/bin/sh

JSON_STRING='window.configs = { \  
  "VUE_APP_BASE_URL":"'"${VUE_APP_BASE_URL}"'", \  
}'

sed -i "s@// CONFIGURATIONS_PLACEHOLDER@${JSON_STRING}@" /app/index.html

exec "$@"