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
    [400  , ":brown_circle:|Bronze"],
    [300  , ":white_circle:|Silver"],
    [200  , ":yellow_circle:|Gold"],
    [100  , ":red_circle:|Elite 80-85 OVR"],
    [50   , ":red_circle:|Elite 85+ OVR"],
    [25   , ":purple_circle:|Master 90-95 OVR"],
    [10   , ":purple_circle:|Master 95+ OVR"],
    [2    , ":black_circle:|Legendary"],
    [16   , ":star:|Icon"],
    [1    , ":star2:|Prime Icon"],
  ];

  if (cmd === 'info') {
    let total = 0;
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      if (!item.length) continue;
      const [possibility, type] = item;
      total += possibility;
    }
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      if (!item.length) continue;
      const [possibility, type] = item;
      const percentage = possibility / total * 100;
      data[i].push(percentage);
    }
    let lines = [];
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      if (!item.length) continue;
      let [,type, percentage] = item;
      percentage = String(
        percentage
      ).substring(0, 5).padEnd(5, '0');
      const line = `\`${percentage}\`% - ${type}`;
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
      const [,type] = data[pack.packid];
      const amount = '`' + String(
        pack.amount
      ).padStart(4, ' ') + '`';
      const line = `${amount} - ${type}`;
      lines.push(line);
    }
    return _y.reply(lines.join('\n'));
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
