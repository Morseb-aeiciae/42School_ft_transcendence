#!/bin/sh

cp -r /app/cache/node_modules/. /app/node_modules/

yarn add webpack
yarn add webpack-cli

cd ./src/components/content/pong
npx webpack -w
cd ../../../..

npm start