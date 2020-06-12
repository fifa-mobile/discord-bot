const db = require('../models/index.js');
const User = db.User;

module.exports = async (_y, args) => {
  const uid = _y.message.author.id;
  const user = await User.findOne({where: {uid: uid}});
  if (!user) {
    return _y.reply(`user not found!`);
  }
  if(!args[1]){
  return _y.reply(`$${user.coins}`);
  }else{
  const user2 = await User.findOne({
      where: {uid: getUser(args[1])}
    });
  return _y.reply(`$${user2.coins}`);
  }
};
