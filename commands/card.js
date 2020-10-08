module.exports = async (m, args) => {
  const y = require('../core/base');
  const Card = require('../models/mongoose/card');

  const cards = await Card.find({});

  console.log(cards.length);

  let id = args[0];

  let card = {};
  let noID = false;
  if (!id) {
    card = cards[
      Math.floor(Math.random() * cards.length)
    ];
    id = card.id;
    noID = true;
  }

  if (id.length > 20) {
    id = id.substring(34);
  }

  if (!noID) {
    card = cards.find(o => o.id === id);
  }
  if (!card) {
    return m.channel.send(
      `<a:cross:751443454244159519> | Can't find the player with id#${id}`
    );
  }

  const D = y.Discord;
  const embed = new D.MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Get this card using $pack command!')
    .setImage(card.img)
    .setURL(card.img)
  ;
	m.channel.send(embed);
};
