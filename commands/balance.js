const db = require('../models/index.js');
const User = db.User;

module.exports = async (_y, args) => {
  const uid = _y.message.author.id;
  const user = await User.findOne({where: {uid: uid}});
  if (!user) {
    return _y.reply(`user not found!`);
  }
  return _y.reply(`$${user.coins}`);
};
