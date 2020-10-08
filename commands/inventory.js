module.exports = async (m, args) => {
  const {User} = require('../models/index.js');
  const uid = m.author.id;
  const user = await User.findOne({where: {uid: uid}});

  if (!user) {
    return m.channel.send('Try having conversation!');
  }

  const items = await user.getItems();

  if (
    !items.length
  )return m.channel.send('You have nothing!');

  return m.channel.send(
    `you have `
    +
    `${items.map(
      t => `${t.amount} ${t.item.name}`
    ).join(', ')}`
  );
};
