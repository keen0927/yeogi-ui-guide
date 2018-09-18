#!/bin/bash -e
echo "
    __  _______     ____  __    ___  ________________  ____  __  ___
   /  |/  / __ \   / __ \/ /   /   |/_  __/ ____/ __ \/ __ \/  |/  /
  / /|_/ / /_/ /  / /_/ / /   / /| | / / / /_  / / / / /_/ / /|_/ /
 / /  / / ____/  / ____/ /___/ ___ |/ / / __/ / /_/ / _, _/ /  / /
/_/  /_/_/      /_/   /_____/_/  |_/_/ /_/    \____/_/ |_/_/  /_/
"

echo 'Setting for build Production...'

echo '=========================================================='
printf "[Warning] Deploy production server \n"
echo '=========================================================='

read -p 'Do you want to build ? <y/n>' prompt
if [[ $prompt == 'y' || $prompt == 'Y' || $prompt == '' ]]
then
    npm i
    cp -r ./dist ./temporarily/dist_`date +%Y%m%d%H%M%S`
    npm run build:prod
else
    exit 0
fi

read -p 'Do you want to deploy? <y/n>' prompt

if [[ $prompt == 'y' || $prompt == 'Y' || $prompt == '' ]]
then
    cp -rf ./temporarily/* ./dist
    echo 'deploy success !';
else
    echo 'deploy cancelled !';
    exit 0
fi
