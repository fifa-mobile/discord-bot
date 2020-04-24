const db = require('../models/index.js');
const {User, Shop} = db;

module.exports = async (_y, args) => {
  const name = args[0];
  const curr = _y.currency;
  
  if (!name) {
    return _y.reply('What do you want to buy?');
  }

  const item = await Shop.findOne({where: {name: name}});
  if (!item) {
    return _y.reply(`Can't find **${name}** in shop!`);
  }
  
  const uid = _y.message.author.id;
  const user = await User.findOne({where: {uid: uid}});
  const balance = curr.getBalance(uid);
  if (!balance) {
    return _y.reply('error getting balance');
  }
  if (!user || item.cost > curr.getBalance(uid)) {
    return _y.reply(`Try having conversation!`);
  }

  curr.add(uid, -item.cost);
  await user.addItem(item);
  _y.reply(`You've bought a **${item.name}**!`);
};
