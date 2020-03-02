const y = require('./base');
const Discord = require('discord.js');
const client = new Discord.Client();

class Y extends y{
  constructor() {
    super();
  }

  _() {
    this.client = client;
  }
}

module.exports = new Y();
