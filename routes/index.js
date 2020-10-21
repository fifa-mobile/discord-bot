var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const user = req.session.user;
  res.render('index', {user: user ? user : false });
});

router.get('/login/discord', function(req, res, next) {
  const base = require('../core/base');
  const jwt = require('jsonwebtoken');
  const token = req.query.token;
  let user = false;
  try {
    user = jwt.verify(token, base.c.main.jwtSecret);
  } catch(err) {
    throw new Error('Not valid login link!', err.message);
  }
  req.session.regenerate(function() {
    req.session.user = user;
    res.redirect('/');
  });
});

router.get('/logout', function(req, res, next) {
  req.session.destroy(function() {
    res.redirect('/');
  });
});

module.exports = router;
