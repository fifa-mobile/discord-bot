const y = require('./base');

class Web {
  constructor(_y) {
    this.y = _y;
    //this.init();
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

  test() {
    const express = require('express');
    const app = express();
    const path = require('path');
    const port = process.env.PORT || 3000;
    const urlShortener = require('node-url-shortener');

    const bodyParser = require('body-parser');
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(express.urlencoded());

    const db = require('../models/index.js');
    const exphbs = require('express-handlebars');

    app.get('/', function(req, res) {
      db.Url.findAll({
        order: [['createdAt', 'DESC']], limit: 5
      }).then(urlObjs => {
        res.render('index', {
          urlObjs: urlObjs
        });
      });
    });

    app.engine('handlebars', exphbs());
    app.set('view engine', 'handlebars');

    app.post('/url', function(req, res) {
      const url = req.body.url;

      urlShortener.short(url, function(err, shortUrl) {
        db.Url.findOrCreate({
          where: {url: url, shortUrl: shortUrl}
        }).then(([urlObj, created]) => {
          res.send(shortUrl);
        });
      });
    });

    app.listen(port, () => console.log(
      `url-shortener listening on port ${port}!`
    ));
  }

  init() {
    const http = require('http');
    const server = http.createServer(
      (req, res) => {
        const url = req.url;
        if (url === '/') {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/plain');
          res.end('0.0.1\n');
        } else {
          res.statusCode = 404;
          res.end('404, sorry!\n');
        }
      }
    );
    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => {
      y.l(`Server running on ${PORT}`);
    });
  }
}

module.exports = y => new Web(y);
