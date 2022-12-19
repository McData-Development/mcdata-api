#!/bin/sh

GREEN="\e[32m"
ENDCOLOR="\e[0m"

echo
echo "Initializing project setup"
echo

echo "(1/3) Installing dependencies"
manager=$(command -v yarn) && yarn install || (rm -f yarn.lock && npm install)


echo
echo "(2/3) Creating new .env file from .env.example"
cp .env.example .env

echo
echo "(3/3) Generate API key for service"
[ "$manager" = "yarn" ] && yarn run scripts:generate-apikey || npm run scripts:generate-apikey

echo
echo "Project setup is done!"
echo -e "use ${GREEN}${manager} run dev${ENDCOLOR} to start the mcdata-api."
echo
