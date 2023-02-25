#!/bin/sh

STRING_TO_REPLACE='// CONFIGURATIONS_PLACEHOLDER'
JSON_STRING='window.configs = { \
  "VUE_APP_BASE_URL":"'"${VUE_APP_BASE_URL}"'", \
  "VUE_APP_API_URL":"'"${VUE_APP_API_URL}"'" \
}'

sed -i "s@${STRING_TO_REPLACE}@${JSON_STRING}@" /app/index.html

exec "$@"