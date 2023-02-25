#!/bin/sh

JSON_STRING='window.configs = { \  
  "VUE_APP_BASE_URL":"'"${VUE_APP_BASE_URL}"'", \
  "VUE_APP_TITLE":"'"${VUE_APP_TITLE}"'", \
  "VUE_APP_API_URL":"'"${VUE_APP_API_URL}"'", \  
  "VUE_APP_API_TIMEOUT":"'"${VUE_APP_API_TIMEOUT}"'" \
}'
STRING_TO_REPLACE='// CONFIGURATIONS_PLACEHOLDER'

sed -i "s@${STRING_TO_REPLACE}@${JSON_STRING}@" /app/index.html

exec "$@"