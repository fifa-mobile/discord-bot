var express = require('express');
var router = express.Router();
const base = require('../core/base');

/* GET home page. */
router.get('/', function(req, res, next) {
  const user = req.session.user;
  if (user && user.guildID) {
    const guild = base.client.guilds.cache.get(user.guildID);
    console.log(guild);
    user.guild = guild.name;
    const member = guild.members.cache.get(user.uid);
    console.log(member);
    user.nick = member.nickname
      ? member.nickname
      : member.user.username + '#' + member.user.discriminator
    ;
    user.avatar = `https://cdn.discordapp.com/avatars/`
      + `${user.uid}/${member.user.avatar}.png?size=32`
    ;
  }
  console.log('user', user);
  res.render('index', {user: user ? user : false });
});

router.get('/login/discord', function(req, res, next) {
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
