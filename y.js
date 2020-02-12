const y = require('./base');

class Y extends y{
  constructor() {
    super();
  }

  _() {
    y.l('hi!');
    this.config = require('./config');
  }
}

module.exports = () => new Y();
