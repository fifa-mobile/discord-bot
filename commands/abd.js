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
    .setThumbnail('https://raw.githubusercontent.com/fifa-mobile/discord-bot/master/images/sbc.jpg')
    .addField('1.Bronze Upgrade:', '4 Bronze players<->1 Silver player')
    .addField('2.Silver Upgrade:', '3 Bronze players+1 Silver player<->1 Gold player')
    .addField('3.Gold Upgrade:', '2 Bronze players+1 Gold player<->1 Elite 80-85 player')
    .addField('4.Weak Elite Upgrade:', '1 Gold player+1 80-85 Elite player<->1 85+ Elite player')
    .addField('5.Elite Upgrade:', '1 Gold player+1 85+ Elite player<->1 90-95 Master player')
    .addField('6.Weak Master Upgrade:', '1 85+ Elite player+1 90-95 Master player<->1 95+ Master player')
    .addField('7.Master Upgrade:', '4 95+ Master player<->1 Legendary player')
    .addField('8.Icon '+ weeklyIcon +':', '1 Gold player+1 90-95 Master player+1 95+ Master player<->1 '+ weeklyIcon +' Icon player')
    .addField('9.Prime Icon '+ weeklyPrime +':', '3 Icon players+2 Legendary players<->1 '+ weeklyPrime +' Prime Icon player')
    .setFooter('The players used in the challenge will be removed from your inventory, so think well before completing.');
  _y.reply(botEmbed);
  }
  if( cmd=== complete){
  if(!args[1]){
  _y.reply('Please add challenge ID.Check `$sbc` or `$sbc list` for IDs.');
  }
  }
  
  
  }
