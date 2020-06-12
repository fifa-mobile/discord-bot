const db = require('../models/index.js');
const User = db.User;

function getUser(str) {
  if (
    str.startsWith('<@') && str.endsWith('>')
  ) {
		str = str.slice(2, -1);

		if (str.startsWith('!')) {
			str = str.slice(1);
		}

		return str;
	}
}

module.exports = async (_y, args) => {
  const uid1 = _y.message.author.id;
  const user = await User.findOne({where: {uid1: uid}});
  var uid2 = getUser(args[1]);
  if (!user) {
    return _y.reply(`User not found!`);
  }
  if(!args[1]){
  return _y.reply(`$${user.coins}`);
  }else{
  const user2 = await User.findOne({
      where: {uid2: getUser(args[1])}
    });
  return _y.reply(`$${user2.coins}`);
  }
};
