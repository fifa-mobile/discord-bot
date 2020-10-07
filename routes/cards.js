var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  (async function() {
    const Card = require('../models/mongoose/card');
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

module.exports = router;
