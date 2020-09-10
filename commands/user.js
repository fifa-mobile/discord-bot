const y = require('../core/base');
const {User} = require('../models/index');

module.exports = async (_y, args) => {
  const itemsPerPage = 10;
  const page = args[0];

  if (page === undefined) {
    //continue;
  } else if (isNaN(Number(page))) {
    return _y.reply(`${page} isn't a number`);
  }

  const offset = itemsPerPage * page;
  const allUsers = await User.findAll();
  const users = await User.findAll({
    order: [['id']],
    limit: itemsPerPage,
    offset: isNaN(offset) ? 0 : offset,
  });
  const maxPage = Math.floor(allUsers.length/itemsPerPage) - 1;

  if (page > maxPage) {
    return _y.reply(
      `The pagination max is`
      + ` ${maxPage}`
    );
  }

  return _y.reply(
    y.table(users, [
      ['id', 3, 1],
      [(uid) => {
        return [y.uname(_y.message, uid), 'uid']
      }, 20],
      ['coins', 10, 1],
    ])
    + `${page === undefined ? 0 : page}`
    + `/${maxPage}`
    + ` page` 
  );
};
