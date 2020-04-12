const y = require('./base');

class Y extends y{
  constructor() {
    super();
  }

  _() {
    this.Discord = y.Discord;
    this.client = y.client;
    this.c = y.c;
  }
}

module.exports = new Y();
