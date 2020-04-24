const {User} = require('../models/index.js');

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
    [200  , 10    , ":yellow_circle:│Gold"],
    [100  , 15    , ":red_circle:│Elite 80-85"],
    [50   , 30    , ":red_circle:│Elite 85+"],
    [25   , 50    , ":purple_circle:│Master 90-95"],
    [10   , 100   , ":purple_circle:│Master 95+"],
    [2    , 5000  , ":black_circle:│Legendary"],
    [16   , 200   , ":star:│Icon"],
    [1    , 10000 , ":star2:│Prime Icon"],
  ];

  if (cmd === 'sell') {
    const id = args[1];
    const amount = Number(args[2]);
    if (!id) {
      return _y.reply('id required, see `info`');
    }
    if (!amount && isNaN(amount) && amount < 1) {
      return _y.reply('Amount number needed!');
    }
    const pack = await user.getPack(id);
    if (!pack || !pack.amount) {
      return _y.reply(
        `You don't have ${data[id][2]} player`
      );
    }
    if (amount > pack.amount) {
      return _y.reply(
        `You only have **${pack.amount}**`
        + ` ${data[id][2]} player`
      );
    }
    const price = data[id][1];
    await user.addPack(id, amount);
    curr.add(uid, price * amount);
    return _y.reply(`you get $${price * amount} coins!`);
  }

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
      const percentage = possibility / total * 100;
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
      ).substring(0, 6).padEnd(6, '0');
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
      return _y.reply(`You don't have any player`);
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
      `option **${cmd}** not found, `
      + `try, \`list / info\``
    );
  }

  if (!user || cost > balance) {
    return _y.reply(
      `You don't have enough coins! cost: $${cost}`
    );
  }

  let players = [];
  for (let i = 0; i < data.length; i++) {
    if (!data[i].length) continue;
    const [multiplier, player] = data[i];
    for (let j = 0; j < multiplier; j++) {
      players.push({id: i, type: player});
    }
  }

  const choosen = players[
    Math.floor(Math.random() * players.length)
  ];

  curr.add(uid, -cost);
  await user.addPack(choosen.id);

  _y.reply(`You got a ${choosen.type} player`);
};
