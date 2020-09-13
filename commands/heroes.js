
module.exports = async (_y, args) => {
  let page = Number(args[0]);
  const numberPerPage = 10;
  const heroesData = require('./hero/data');
  const heroes = [];

  if (!args[0]) {
    page = 0;
  }

  if (isNaN(page)) {
    return _y.reply(`<a:cross:751443454244159519> | ${page} is not a number!`);
  }

  const maxPage = Math.floor(heroesData.length / numberPerPage);
  if (page > maxPage) {
    return _y.reply(`<:info:751794158162935838> | The pagination max is ${maxPage}`);
  }

  const offset = (heroesData.length - 1) - (page * numberPerPage);
  let limit = (offset - numberPerPage) + 1;
  limit = limit < 0 ? 0 : limit;
  for (
    let i = offset;
    i >= limit ; i--
  ) {
    const hero = heroesData[i];
    const text = `${hero.name} (${hero.fullName})`;
    let collapse = '...';
    if (text.length < 24) {
      collapse = '';
    }
    heroes.push(
      (text.substring(0,21) + collapse).padEnd(24, ' ')
      +
      '-'
      +
      (i + 1).toString().padStart(3, ' ')
    );
  }

  _y.replyCode(
    heroes.join('\n')
    +
    `\n\n----------------`
    +
    `${page}/${maxPage} page`
  );
};
