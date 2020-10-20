module.exports = async (m, args, curr) => {
  const base = require('../core/base');
  const secret = base.c.main.jwtSecret;
  const host = base.c.main.host;
  const moment = require('moment');
  const jwt = require('jsonwebtoken');
  const { User } = require('../models/index');
  await curr.add(m.author.id, 0);
  const user = await User.findOne({where: {uid: m.author.id}});
  const tokenData = {
    id: user.id,
    uid: m.author.uid,
    guildID: m.guild.id,
  };
  const time = 60 * 1;
  const token = jwt.sign(tokenData, secret, {expiresIn: time});
  m.author.send(
    `your login link: \n\n ${
      host + '/login/discord?token=' + token
    }`
    + `\n\n will expire in `
    + `${moment.duration(time, 'seconds').humanize()}`
  );
  m.channel.send(`<@${m.author.id}>, check your DM for the link`);
};
