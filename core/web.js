const y = require('./base');

class Web {
  constructor(_y) {
    this.y = _y;
    this.x();
  }

  x() {
    const port = process.env.PORT || 3000;

    const express = require('express');
    const _handlebars = require('handlebars');
    const exphbs  = require('express-handlebars');
    const {allowInsecurePrototypeAccess} = require(
      '@handlebars/allow-prototype-access'
    );
    const app = express();

    const urlShortener = require('node-url-shortener');
    const bodyParser = require('body-parser');
    const db = require('../models/index.js');

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(express.urlencoded());
    app.engine('handlebars', exphbs({
      handlebars: allowInsecurePrototypeAccess(
        _handlebars
      )
    }));
    app.set('view engine', 'handlebars');

    app.get('/', function(req, res) {
      db.Url.findAll({
        order: [['createdAt', 'DESC']], limit: 5
      }).then(urlObjs => {
        res.render('index', {
          urlObjs: urlObjs
        });
      });
    });

    app.post('/url', function(req, res) {
      const url = req.body.url

      urlShortener.short(url, function(err, shortUrl) {
        db.Url.findOrCreate({
          where: {url: url, shortUrl: shortUrl}
        }).then(([urlObj, created]) => {
          res.redirect('/');
        });
      });
    });

    app.listen(port, () => console.log(
      `url-shortener listening on port ${port}!`
    ));
  }
}

module.exports = y => new Web(y);
