
module.exports = async (_y, args) => {
  const y = require('../core/base');
  const D = y.Discord;
  
 const botEmbed = new D.RichEmbed()
    .setColor('#74b4c3')
    .setTitle('SBC :crabDance:')
    .setDescription('Use $sbc complete [id] to complete a SBC. :crabDance:')
     _y.reply(botEmbed);
  }
  
  
  
