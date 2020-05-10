const y = require('./base');

class Web {
  constructor(_y) {
    this.y = _y;
    this.x();
  }

  x() {
    const port = process.env.PORT || 3000;

    const express = require('express');
    const app = express();
    const path = require('path');

    app.use(express.static(path.join(
      __dirname, '../public'
    )));

    app.listen(port, () => console.log(
      `listening on port ${port}!`
    ));
  }
}

module.exports = y => new Web(y);
