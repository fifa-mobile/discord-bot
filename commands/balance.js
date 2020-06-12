/* Juve's nub idea
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
  if(!args[1]){
  uid = _y.message.author.id;
  const user = await User.findOne({where: {uid: uid}});
  }else{ 
  uid = getUser(args[1]);
  const user = await User.findOne({where: {uid: uid}});
  }
  if (!user) {
    return _y.reply(`User not found!`);
  }
  return _y.reply(`$${user.coins}`);

};*/
/* Real code*/
const db = require('../models/index.js');
const User = db.User;

module.exports = async (_y, args) => {
  const uid = _y.message.author.id;
  const user = await User.findOne({where: {uid: uid}});
  if (!user) {
    return _y.reply(`User not found!`);
  }
  return _y.reply(`$${user.coins}`);
};
