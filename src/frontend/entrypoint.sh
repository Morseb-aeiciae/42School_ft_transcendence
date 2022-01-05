#!/bin/sh

cp -r /app/cache/node_modules/. /app/node_modules/

yarn add webpack
yarn add webpack-cli

# Pong Compilation :

cd ./src/components/content/pong
npx webpack -w
cd ../../../..

npm start