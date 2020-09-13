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
      `<a:cross:751443454244159519> | You do not have enough permissions to execute this command.`
    );
  }

  const curr = _y.currency;
  const id = Number(args[0]);

  if (!id || isNaN(id)) {
    return _y.reply(`<a:info:751794158162935838> | User ID needed!`);
  }

  const user = await User.findOne({where: {id: id}});
  const amount = Number(args[1]);

  if (!user) {
    return _y.reply(`<a:cross:751443454244159519> | User not found!`);
  }
  if (isNaN(amount)) {
    return _y.reply(`<a:info:751794158162935838> | Amount needed`);
  }

  curr.add(user.uid, amount);

  const name = y.uname(_y.message, user.uid);
  _y.reply(`<a:check:751443477417426964> | Adding ${amount}<a:coin:751813392989290546> to ${name}.`);
};
