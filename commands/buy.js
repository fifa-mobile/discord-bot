const db = require('../models/index.js');
const {User, Shop} = db;

module.exports = async (m, args, curr) => {
  const name = args[0];
  
  if (!name) {
    return m.channel.send('What do you want to buy?');
  }

  const item = await Shop.findOne({where: {name: name}});
  if (!item) {
    return m.channel.send(`Can't find **${name}** in shop!`);
  }
  
  const uid = m.author.id;
  const user = await User.findOne({where: {uid: uid}});
  const balance = curr.getBalance(uid);
  if (!balance) {
    return m.channel.reply('error getting balance');
  }
  if (!user || item.cost > curr.getBalance(uid)) {
    return m.channel.send(`Try having conversation!`);
  }

  curr.add(uid, -item.cost);
  await user.addItem(item);
  m.channel.send(`You've bought a **${item.name}**!`);
};
