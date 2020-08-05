const y = require('../core/base');
const {User} = require('../models/index.js');
const cards = require('../data/cards');

module.exports = async (_y, args) => {
  const curr = _y.currency;
  const uid = _y.message.author.id;
  const cost = 10;
  const user = await User.findOne({where: {uid: uid}});
  const balance = curr.getBalance(uid);
  const cmd = args[0];

  const data = [
    [],
    [400  , 1     , ":brown_circle:│Bronze"],
    [300  , 5     , ":white_circle:│Silver"],
    [175  , 10    , ":yellow_circle:│Gold"],
    [50   , 15    , ":red_circle:│Elite 80-85"],
    [30   , 30    , ":red_circle:│Elite 85+"],
    [20   , 50    , ":purple_circle:│Master 90-95"],
    [10   , 100   , ":purple_circle:│Master 95+"],
    [2    , 500  , ":black_circle:│Legendary"],
    [12   , 200   , ":star:│Icon"],
    [1    , 2000 , ":star2:│Prime Icon"],
  ];

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
      '`·id│price   │ chance %`'
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
        `\`·${id}│$${price} │ ${percentage} %\` │`
        + `${type}`
      ;
      lines.push(line);
    }
    return _y.reply(lines.join('\n'));
  }

  if (cmd === 'list') {
    const packs = await user.getPacks();
    if (!packs.length) {
      return _y.reply(`You don't have any player.`);
    }
    let lines = [];
    for (let i = 0; i < packs.length; i++) {
      const pack = packs[i];
      const [,,type] = data[pack.packid];
      const amount = '`' + '·' + String(
        pack.amount
      ).padStart(4, ' ') + '`';
      const line = `${amount} - ${type}`;
      lines.push(line);
    }
    return _y.reply(lines.join('\n'));
  }

  if (cmd) {
    return _y.reply(
      `Option **${cmd}** not found, `
      + `try, \`list / info\``
    );
  }

  if (!user || cost > balance) {
    return _y.reply(
      `You don't have enough coins! Cost: $${cost}`
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

  const choosen = players[
    Math.floor(Math.random() * players.length)
  ];
  const card = cards[choosen.id][
    Math.floor(Math.random() * cards[choosen.id].length)
  ];

  curr.add(uid, -cost);
  await user.addPack(choosen.id);

  const title = `You got a ${choosen.type} player`;

  const url =
    'https://fifa-mobile.github.io/images/cards/'
    +
    `${card}.png`
  ;
  const D = y.Discord;
  const embed = new D.RichEmbed()
    .setColor('#0099ff')
    .setTitle(title)
    .setImage(url)
    .setURL(url)
  ;
	_y.reply(embed);
};
