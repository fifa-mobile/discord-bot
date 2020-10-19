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

  const D = y.Discord;
  const memberMap = async member => {
    const nick = member.nickname
      ? member.nickname
      : member.user.username + '#' + member.user.discriminator
    ;
    const db = await User.findOne({where: {uid: member.user.id}});
    if (!db || member.bot) {
      console.log(nick, ' >>> is not in database');
    }
    return {
      ID: db ? db.id : false,
      Name: nick.length > 26
        ? nick.substring(0, 26) + '...' : nick,
      Coins: db ? db.coins : false,
    };
  };
  let members = (await Promise.all(
    m.guild.members.cache.array().map(member => memberMap(member))
  ));

  console.log(members, members.length);

  const offset = itemsPerPage * page;
  members = members.filter(
    member => member.ID
  );
  members.sort((a, b) => a.ID - b.ID);
  console.log('filtered', members, members.length);
  const maxPage = Math.ceil(members.length/itemsPerPage) - 1;

  const startIndex = isNaN(offset) ? 0 : offset;
  const endIndex = startIndex + itemsPerPage;

  members = members.slice(
    startIndex, endIndex
  );

  if (page > maxPage) {
    return m.channel.send(
      `<:info:751794158162935838> | The pagination max is`
      + ` ${maxPage}`
    );
  }

  const header = {
    y: 2,
    fields: [
      {text: 'ID', x: 2, textAlign: `right`,},
      {text: 'Name', x: 80},
      {text: 'Coins', x: 400, textAlign: `right`,},
    ],
  };
  const imgBuf = await require('../canvas/list')(header, members);
  const img = new D.MessageAttachment(imgBuf, 'list.png');
  const embed = {
    title: 'User List',
    image: {
      url: 'attachment://list.png',
    },
    footer: {
      text: `${page === undefined ? 0 : page}`
        + `/${maxPage}`
        + ` page` 
    },
  };
  return m.channel.send({
    files: [img], embed: embed,
  });
};
