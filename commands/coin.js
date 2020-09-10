const y = require('../core/base');
const {User} = require('../models/index.js');

module.exports = async (_y, args) => {
  if (
    _y.message.member.roles.cache.find(
      r => r.name === 'Staff'
    )
  ) {
    // continue
  } else {
    return _y.reply(
      `You don't have permission to execute this command`
    );
  }

  const curr = _y.currency;
  const id = Number(args[0]);

  if (!id || isNaN(id)) {
    return _y.reply(`User ID needed!`);
  }

  const user = await User.findOne({where: {id: id}});
  const amount = Number(args[1]);

  if (!user) {
    return _y.reply(`User not found!`);
  }
  if (isNaN(amount)) {
    return _y.reply(`Amount needed`);
  }

  curr.add(user.uid, amount);

  const name = y.uname(_y.message, user.uid);
  _y.reply(`Adding $${amount} to ${name}`);
};
