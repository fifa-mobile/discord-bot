const y = require('../core/base');
const {User} = require('../models/index');

module.exports = async (_y, args) => {
  if (
    _y.message.member.roles.find(
      r => r.name === 'Staff'
    )
  ) {
    // continue
  } else {
    return _y.reply(
      `You don't have permission to execute this command`
    );
  }
  const users = await User.findAll({
    order: [['id']]
  });
  return _y.reply(y.table(users, [
    ['id', 3, 1],
    [(uid) => {
      return [y.uname(_y.message, uid), 'uid']
    }, 10],
    ['uid', 20, 1],
  ]));
};
