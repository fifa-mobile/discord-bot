const y = require('../core/base');
const cards = require('../data/cards');

module.exports = (_y, args) => {
  const ids = [];
  for (let i = 0; i < cards.length; i++) {
    const part = cards[i];
    for (let j = 0; j < part.length; j++) {
      const card = part[j];
      ids.push(card);
    }
  }
	const id = ids[
		Math.floor(Math.random() * ids.length)
	];
  const D = y.Discord;
  const url = 
    'https://fifa-mobile.github.io/images/cards/'
    +
    `${id}.png`
  ;
  const embed = new D.RichEmbed()
    .setColor('#0099ff')
    .setTitle('Get this card using $pack command!')
    .setImage(url)
    .setURL(url)
  ;
	_y.reply(embed);
};
