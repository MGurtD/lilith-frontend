#!/bin/sh

JSON_STRING='window.configs = { \  
  "VUE_APP_BASE_URL":"'"${VUE_APP_BASE_URL}"'", \
  "VUE_APP_TITLE":"'"${VUE_APP_TITLE}"'", \
  "VUE_APP_API_URL":"'"${VUE_APP_API_URL}"'", \  
  "VUE_APP_API_TIMEOUT":"'"${VUE_APP_API_TIMEOUT}"'" \
}'

sed -i "s@// CONFIGURATIONS_PLACEHOLDER@${JSON_STRING}@" /app/index.html

exec "$@"