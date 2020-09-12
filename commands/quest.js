const y = require('../core/base');
const D = y.Discord;
const { User } = require('../models/index');

module.exports = async (_y, args) => {
  const uid = _y.message.author.id;
  const user = await User.findOne({where: {uid: uid}});
  const quests = await user.quests();

  let message = 'No available quest for you!';

  if (!quests.daily) {
    message = 
      'Something you can do to earn BoT rewards'
      +
      '\n'
      +
      '\n'
      +
      '1. Daily Claim'
    ;
  }

  const embed = new D.MessageEmbed()
    .setColor('#00a2ff')
    .setTitle('Quests')
    .setDescription(message)
  ;
  _y.reply(embed);
};
