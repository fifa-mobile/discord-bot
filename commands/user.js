const y = require('../core/base');
const {User} = require('../models/index');

module.exports = async (_y, args) => {
  const users = await User.findAll({
    order: [['id']]
  });
  return _y.reply(y.table(users, [
    ['id', 3, 1],
    [(uid) => {
      return [y.uname(_y.message, uid), 'uid']
    }, 20],
    ['coins', 10, 1],
  ]));
};
