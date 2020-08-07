module.exports = (_y, args) => {
  const Discord = _y.Discord;
  const botEmbed = new Discord.RichEmbed()
    .setColor('#1d9eaf')
    .setTitle('League Bot')
    .setURL('https://github.com/fifa-mobile')
    .setAuthor('League Bot')
    .setDescription('Info on League Bot')
    .setThumbnail(
      'https://fifa-mobile.github.io/images/'
      + 'discordbot-bot-discord-'
      + '11563261320iwm1tpnosh.png'
    )
    .addField('Founders:', '- yuulye\n- juve938383')
    .addField('MasterOfNubs:', '- Pradeep5986')
    .addField('Server(s):', 'AHQ Leagues', true)
    .addField('Date created:', '2nd November 2019', true)
    .addField('Use:', 'General purpose', true)
    .setTimestamp()
    .setFooter('@fifa-mobile|AHQ League');
  _y.reply(botEmbed);
};
