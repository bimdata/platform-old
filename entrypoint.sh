#!/bin/bash
set -e

npm run build

exec nginx -g "daemon off;"
