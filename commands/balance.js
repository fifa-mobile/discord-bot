/* Juve's nub idea*/
const db = require('../models/index.js');
const User = db.User;

module.exports = async (_y, args) => {
  const uid = _y.message.author.id;
  if(args[1]){
  const uid2 = getUser(args[1]);
  }
  if(!args[1]){
  const user = await User.findOne({where: {uid: uid}});
  }else{
  const user = await User.findOne({where: {uid2: uid2}});
  }
   if (!user) {
    return _y.reply(`User not found!`);
  }
  return _y.reply(`$${user.coins}`);

};

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

/* Real code
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
*/
