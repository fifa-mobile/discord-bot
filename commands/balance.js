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
  var uid;
  const user = await User.findOne({where: {uid1: uid}});
  if (!user) {
    return _y.reply(`User not found!`);
  }
  if(!args[1]){
  uid = _y.message.author.id;
  return _y.reply(`$${user.coins}`);
  }else{ 
  uid = getUser(args[1]);
  const user2 = await User.findOne({
      where: {uid: getUser(args[1])}
    });
  return _y.reply(`$${user2.coins}`);
  }
};
