#!/bin/bash

if [ ! -f "./spa/single-spa-app.js" ]; then
  echo "spa/single-spa-app.js does not exist"
  exit 1
fi

if [ ! -f "./dist/wux.min.js" ]; then
  echo "dist/wux.min.js does not exist"
  exit 1
fi

if [ ! -f "./dist/app.min.js" ]; then
  echo "dist/app.min.js does not exist"
  exit 1
fi

cat ./spa/single-spa-app.js ./dist/wux.min.js ./dist/app.min.js > index.js

rm -f ../single-spa-app/src/index.js.bak

cp ../single-spa-app/src/index.js ../single-spa-app/src/index.js.bak

mv --force index.js ../single-spa-app/src/index.js

