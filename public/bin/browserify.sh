#!/usr/bin/env bash

# Script to browserify without Gulp - usually Gulp is used to browserify and
# build everything.

# Information steps:
# 1) chmod u+x browserify.sh
# 2) ./browserify.sh
echo "--> Doing browserify tasks"
echo "--> Set path to browserify cmd"
browserify_cmd=node_modules/browserify/bin/cmd.js
# browserify_cmd=usr/local/lib/node_modules/browserify/bin/cmd.js

echo "--> Set path for a bin directory"
bin_path=`dirname $0`
pushd $bin_path/.. > /dev/null
mkdir app/dist 2> /dev/null

echo "--> Doing the browserify commands for the app.js file"
$browserify_cmd \
  --entry app/js/app.js \
  --outfile app/dist/app.js \
  --debug \
  --verbose

echo "--> Doing the browserify commands for the unit test files in folder 'test/unit/controller' and 'test/unit/service'"
# $browserify_cmd \
#  test/unit/controller/*.js \
#  test/unit/service/*.js \
#  --outfile test/browserified/browserified_tests.js \
#  --debug \
#  --verbose

popd > /dev/null
