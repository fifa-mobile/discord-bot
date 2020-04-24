const {User} = require('../models/index.js');

module.exports = async (_y, args) => {
  const uid = _y.message.author.id;
  const user = await User.findOne({where: {uid: uid}});

  if (!user) {
    return _y.reply('Try having conversation!');
  }

  const items = await user.getItems();

  if (
    !items.length
  )return _y.reply('You have nothing!');

  return _y.reply(
    `you have `
    +
    `${items.map(
      t => `${t.amount} ${t.item.name}`
    ).join(', ')}`
  );
};
