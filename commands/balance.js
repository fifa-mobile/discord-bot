const db = require('../models/index.js');
const User = db.User;

module.exports = async (_y, args) => {
  const uid = _y.message.author.id;
  const user = await User.findOne({where: {uid: uid}});
  if (!user) {
    return _y.reply(`User not found!`);
  }
  return _y.reply('<a:info:751794158162935838> | You have '+${user.coins}+'<a:coin:751813392989290546>');
};

