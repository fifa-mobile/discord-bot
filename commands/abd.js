module.exports = async (_y, args) => {
  const {User} = require('../models/index');
  const cards = require('../data/cards');
  const uid = _y.message.author.id;
  const user = await User.findOne({where: {uid: uid}});
  const y = require('../core/base');
  const D = y.Discord;
  const cmd = args[0];
  const curr = _y.currency;
  const balance = curr.getBalance(uid);
  
  const weeklyIcon = 'Schmeichel';
  const weeklyIconID = 21502635;
  const weeklyPrime = 'Zidane';
  const weeklyPrimeID = 21500198;
  
  if( !cmd || cmd === list){
  const botEmbed = new D.RichEmbed()
    .setColor('#74b4c3')
    .setTitle('SBC')
    .setDescription('Use $sbc complete [id] to complete a SBC.')
    .setThumbnail('../images/sbc.jpg')
    .addField('Bronze Upgrade:', '4 Bronze players<->1 Silver player')
    .addField('Silver Upgrade:', '3 Bronze players+1 Silver player<->1 Gold player')
    .addField('Gold Upgrade:', '2 Bronze players+1 Gold player<->1 Elite 80-85 player')
    .addField('Weak Elite Upgrade:', '1 Gold player+1 80-85 Elite player<->1 85+ Elite player')
    .addField('Elite Upgrade:', '1 Gold player+1 85+ Elite player<->1 90-95 Master player')
    .addField('Weak Master Upgrade:', '1 85+ Elite player+1 90-95 Master player<->1 95+ Master player')
    .addField('Master Upgrade:', '4 95+ Master player<->1 Legendary player')
    .addField('Icon '+ weeklyIcon +':', '1 Gold player+1 90-95 Master player+1 95+ Master player<->1 '+ weeklyIcon +' Icon player')
    .addField('Prime Icon '+ weeklyPrime +':', '3 Icon players+2 Legendary players<->1 '+ weeklyPrime +' Prime Icon player')
    .setFooter('The players used in the challenge will be removed from your inventory, so think well before completing.');
  _y.reply(botEmbed);
  }
  
  
  
  }
