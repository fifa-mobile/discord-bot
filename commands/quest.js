const y = require('../core/base');
const D = y.Discord;
const { User } = require('../models/index');

module.exports = async (m, args, curr) => {
  const uid = m.author.id;
  const user = await User.findOne({where: {uid: uid}});
  const quests = await user.quests();

  const cmd = args[0];

  if (cmd === 'claim') {
    let claimCount = 0;
    if (!quests.daily) {
      const dailyRewardCoins = 10;
      quests.daily = true;
      await quests.save();
      curr.add(uid, dailyRewardCoins);
      m.channel.send(
        `You got your daily`
        + ` ${dailyRewardCoins}`
        + ` <a:coin:751813392989290546>!`
      );
      claimCount++;
    }
    if (!claimCount) {
      m.channel.send(
        '<:info:751794158162935838> | You have already claimed all quests\' rewards'
      );
    }
  }

  let message = '<:info:751794158162935838> | No available quest for you!';

  const items = [
    'Daily Claim',
  ];

  for (let i = 0; i < items.length; i++) {
    if (i === 0) {
      if (quests.daily)
        items[i] = '<a:checkmark1:751806451474890752> ' + items[i];
      else
        items[i] = `${i+1}. ` + items[i];
    }
  }

  message = 
    'Something you can do to earn BoT rewards'
    +
    '\n'
    +
    '\n'
    +
    items.join('\n');
  ;

  const embed = new D.MessageEmbed()
    .setColor('#00a2ff')
    .setTitle('Quests')
    .setDescription(message)
  ;
  m.channel.send(embed);
};
