#!/bin/bash
# Information steps:
# 1) chmod u+x start-sample.sh
# 2) ./start-sample.sh

user="YOUR BLUEMIX ID"
bluemix_api="https://api.YOUR BLUEMIX API"
organization_name="YOUR BLUEMIX ORGANIZATION"
space_name="YOUR BLUEMIX SPACE"
application_name="browserfied-ibmiotf-webapplication"

pwd
echo "--> 01. Install the npm packages for the webapplication"
echo "**********************************************"
echo ""
cd ..
cd public
sudo npm install
echo ""
pwd
echo "--> 02. Create browserified app.js file"
echo "**********************************************"
echo ""
cd bin
./browserify.sh
cd ..
pwd
cd ..
pwd
ls ..
echo "--> 03. Push the application into Bluemix for following configuration:"
echo "**********************************************"
echo "a. User: '$user' API: '$bluemix_api'"
echo "b. Organization: '$organization_name'"
echo "c. Space: '$space_name'"
echo ""
echo "Insert your bluemix password:"
# How to input a password in bash shell
# http://stackoverflow.com/questions/3980668/how-to-get-a-password-from-a-shell-script-without-echoing
read -s password
cf login -a $bluemix_api -u $user -p $password -o $organization_name -s $space_name
echo ""
echo "**********************************************"
echo "--> Starting push and log CF $application_name"
cf spaces
echo "****** show existing apps *********"
cf apps
echo "******* push to CF ********"
cf push  $application_name
echo "******* start CF logging ********"
cf logs  $application_name
