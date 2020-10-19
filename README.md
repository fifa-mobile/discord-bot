# Answers HQ Discord BoT


----

## Cloning local repository

`$ git clone https://github.com/fifa-mobile/discord-bot.git dev`

change to dev directory

`$ cd dev`

install npm packages

`$ npm install`

setup configs files; copy _*_.tmp files and remove the .tmp extension

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

---

### heroku cli

login

`$ heroku login -i`

enter you login info

creating database on heroku

`heroku addons:create heroku-postgresql:hobby-dev -a appname`

connect with heroku database

`$ heroku pg:psql -a appname`

running migration

`$ heroku run bash -a appname`
`$ sequelize db:migrate`


## Database Installation

choose your platform example: https://www.postgresql.org/download/linux/ubuntu/

```
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
sudo apt-get update
sudo apt-get -y install postgresql
```

#### Database User Creation

```
sudo -u postgres psql

postgres=# CREATE USER username;
CREATE ROLE

postgres=# ALTER USER jon SUPERUSER CREATEDB;
ALTER ROLE

postgres=# \du

$ createdb username

$ psql

username=# CREATE DATABASE dbname;
CREATE DATABASE
```

#### Running migration

```
npx sequelize-cli db:migrate
```




