const y = require('./base');

class Y extends y{
  constructor() {
    super();
  }

  _() {
    this.Discord = y.Discord;
    this.client = y.client;
  }
}

module.exports = new Y();
