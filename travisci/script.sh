#!/usr/bin/env bash

# run debug build
echo "npm run debug build on $TRAVIS_OS_NAME"
npm run build:dev

# run production build
echo "npm run production build on $TRAVIS_OS_NAME"
npm run build:prod

# clean before the real production build
npm run clean

# run production + AOT build
echo "npm run production + AOT build on $TRAVIS_OS_NAME"
npm run build:prod:aot

# run unit test
echo "npm run test on $TRAVIS_OS_NAME"
npm test

# run e2e test (requires server-side up and running)
echo "dropping db collections"
mongo KS --eval 'db.projects.drop()'

echo "filling db with data"
mongorestore -d KS -c projects --dir=./db-dump-e2e/KS/projects.bson

sleep 5

echo "npm run e2e on $TRAVIS_OS_NAME"
npm run ci:e2e