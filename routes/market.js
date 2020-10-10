var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('market', {
    layout: 'layouts/base',
    title: 'Market',
  });
});

router.get('/graph', function(req, res, next) {
  res.render('market_graph', {
    layout: 'layouts/base',
    title: 'Market'
  });
});

module.exports = router;
