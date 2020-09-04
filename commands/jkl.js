
module.exports = async (_y, args) => {
  const y = require('../core/base');
  const D = y.Discord;
  
 const botEmbed = new D.RichEmbed()
    .setColor('#74b4c3')
    .setTitle('SBC :crabDance:')
    .setDescription('Use $sbc complete [id] to complete a SBC. <a:crabDance:751080988250996736>')
     _y.reply(botEmbed);
     _y.reply(`<a:crabDance:751080988250996736>`);
  }
  
  
  
