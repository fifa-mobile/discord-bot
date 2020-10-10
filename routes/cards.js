var express = require('express');
var router = express.Router();
const Card = require('../models/mongoose/card');

router.get('/', function(req, res, next) {
  (async function() {
    const cards = await Card.find({}, null, {
      sort: {updatedAt: 'desc'}
    }).exec();
    res.render('cards', {
      title: 'Card List',
      layout: 'layouts/base',
      cards: cards,
    });
  })();
});

router.post('/search', function(req, res, next) {
  const search = req.body.search;
  const fetch = require('node-fetch');
  fetch(
    'https://fifarenderz.com/external/20/'
    + 'player-search?type=player&showall=true&data='
    + search
  )
    .then(res => res.json())
    .then(data => res.json(data));
});

module.exports = router;
