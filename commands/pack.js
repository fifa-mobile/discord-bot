const y = require('../core/base');
const {User} = require('../models/index.js');
const cards = require('../data/cards');

module.exports = async (m, args, curr) => {
  const uid = m.author.id;
  const cost = 10;
  const user = await User.findOne({where: {uid: uid}});
  const balance = curr.getBalance(uid);
  const cmd = args[0];
  const data = require('../data/pack/values');

  if (cmd === 'info') {
    let total = 0;
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      if (!item.length) continue;
      const [possibility,, type] = item;
      total += possibility;
    }
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      if (!item.length) continue;
      const [possibility,, type] = item;
      const percentage = (
        possibility / total * 100
      ).toLocaleString(
          undefined, {minimumFractionDigits: 1}
      );
      data[i].push(percentage);
    }
    let lines = [
      '·Id │<a:coin:751813392989290546>Value│ Chance'
    ];
    for (let i = data.length - 1; i >= 0; i--) {
      const item = data[i];
      if (!item.length) continue;
      let [, price, type, percentage] = item;
      const id = String(i).padStart(2, ' ');
      price = String(
        price
      ).substring(0, 5).padStart(6, ' ');
      percentage = String(
        percentage
      ).substring(0, 6).padStart(6, ' ');
      const line =
        `\`·${id}│${price}  |${percentage} %\` │`
        + `${type}`
      ;
      lines.push(line);
    }
    return m.channel.send(lines.join('\n'));
  }

  if (cmd === 'list') {
    const packs = await user.getPacks();
    if (!packs.length) {
      return m.channel.send(`<:info751794158162935838> | You don't have any player.`);
    }
    let lines = [];
    for (let i = 0; i < packs.length; i++) {
      const pack = packs[i];
      const [,,type] = data[pack.packid];
      if(type === undefined){
      break;
      }
      const amount = '`' + '·' + String(
        pack.amount
      ).padStart(4, ' ') + '`';
      const line = `${amount} - ${type}`;
      lines.push(line);
    }
    return m.channel.send(lines.join('\n'));
  }

  if (cmd) {
    return m.channel.send(
      `<:info:751794158162935838> | Option **${cmd}** not found, `
      + `try, \`list / info\``
    );
  }

  if (!user || cost > balance) {
    return m.channel.send(
      `<:info:751794158162935838> | You don't have enough coins! Cost: ${cost}<a:coin:751813392989290546>`
    );
  }

  let players = [];
  for (let i = 0; i < data.length; i++) {
    if (!data[i].length) continue;
    const [multiplier,, player] = data[i];
    for (let j = 0; j < multiplier; j++) {
      players.push({id: i, type: player});
    }
  }

  let choosen = {};
  let card = -1;

  choosen = players[
    Math.floor(Math.random() * players.length)
  ];

  const Card = require('../models/mongoose/card');
  const dbCards = await Card.find({typeID: choosen.id});
  card = dbCards[
    Math.floor(
      Math.random() * dbCards.length
    )
  ];


  curr.add(uid, -cost);
  console.log('choosen.id', choosen.id);
  await user.addPack(choosen.id);

  const title = `You got a ${choosen.type} player`;

  const url = card.img;
  const D = y.Discord;
  const embed = new D.MessageEmbed()
    .setColor('#0099ff')
    .setTitle(title)
    .setImage(url)
    .setURL(url)
  ;
	m.channel.send(embed);
};
