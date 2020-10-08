const y = require('../core/base');
const {User} = require('../models/index');

module.exports = async (m, args) => {
  if (
    m.member.roles.find(
      r => r.name === 'Staff'
    )
  ) {
    // continue
  } else {
    return m.channel.send(
      `You don't have permission to execute this command`
    );
  }
  const users = await User.findAll({
    order: [['id']]
  });
  return m.channel.send(y.table(users, [
    ['id', 3, 1],
    [(uid) => {
      return [y.uname(m, uid), 'uid']
    }, 10],
    ['uid', 20, 1],
  ]));
};
