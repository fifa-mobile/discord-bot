
module.exports = async (_y, args) => {
  const heroesData = require('./hero/data');
  const heroes = [];
  for (let i = heroesData.length - 1; i >= 0 ; i--) {
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
  _y.replyCode(heroes.join('\n'));
};
