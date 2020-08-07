# AHQ Discord BoT

---

## Cloning local repository

`$ git clone https://github.com/fifa-mobile/discord-bot.git dev`

change to dev directory

`$ cd dev`

install npm packages

`$ npm install`

setup configs files; copy *.tmp files and remove the .tmp extension

ask yuulye for BoT token.

setup local database

https://stackabuse.com/adding-a-postgresql-database-to-a-node-js-app-on-heroku/

set config/config.json as your database setting

to prevent your local changes being committed

`$ git update-index --assume-unchanged config/config.json`

Database migration

`$ npx sequelize-cli db:migrate`

Run the app

`$ npm start`
