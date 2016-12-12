#!/usr/bin/env bash

# This script continuously browserifies the client side JavaScript, same as the
# Gulp build would do. It gives faster turnaround times than a full Gulp
# build. It does not execute JSHint or minification, just the browserify stuff.
# Using this script only makes sense when index.html references the non-minified
# build (that is, app/dist/app.js, not app/dist/app.min.js).

# This script assumes that watchify is installed globally. To do that execute
# npm install -g watchify

# The watchify process is started in the background. Use
# pkill -f watchify or pkill -f "node.*watchify"
# to stop them.

# Information steps:
# 1) chmod u+x watchify.sh
# 2) ./watchify.sh

echo "--> Starting watchify tasks!!"
echo "--> Set bin path for watchify"
bin_path=`dirname $0`
pushd $bin_path/.. > /dev/null
echo "--> Create app/dist folder"
mkdir app/dist 2> /dev/null

echo "--> Doing watchify commands for the app.js file"
watchify \
  --entry app/js/app.js \
  --outfile app/dist/app.js \
  --debug \
  --verbose \
  &

echo "--> Doing watchify commands for the 'test/unit/controller' and 'test/unit/service' files "
watchify \
  test/unit/controller/*.js \
  test/unit/service/*.js \
  --outfile test/browserified/browserified_tests.js \
  --debug \
  --verbose \
  &

popd > /dev/null
