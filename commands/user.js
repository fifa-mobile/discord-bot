const y = require('../core/base');
const {User} = require('../models/index');

module.exports = async (m, args) => {
  const itemsPerPage = 10;
  const page = args[0];

  if (page === undefined) {
    //continue;
  } else if (isNaN(Number(page))) {
    return m.channel.send(`<:info:751794158162935838> | ${page} isn't a number`);
  }

  const offset = itemsPerPage * page;
  const allUsers = await User.findAll();
  const users = await User.findAll({
    order: [['id']],
    limit: itemsPerPage,
    offset: isNaN(offset) ? 0 : offset,
  });
  const maxPage = Math.floor(allUsers.length/itemsPerPage);

  if (page > maxPage) {
    return m.channel.send(
      `<:info:751794158162935838> | The pagination max is`
      + ` ${maxPage}`
    );
  }

  return m.channel.send(
    y.table(users, [
      ['id', 3, 1],
      [(uid) => {
        return [y.uname(m, uid), 'uid']
      }, 20],
      ['coins', 10, 1],
    ])
    + `${page === undefined ? 0 : page}`
    + `/${maxPage}`
    + ` page` 
  );
};
