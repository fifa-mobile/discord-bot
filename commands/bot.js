module.exports = (_y, args) => {
  const Discord = _y.Discord;
  const users = [
    'yuulye <:yuulye:752179480164040764>',
    'juve938383',
    'Pradeep',
    'MahadhirMahi',
    'Genesis',
  ];
  const botEmbed = new Discord.MessageEmbed()
    .setColor('#1d9eaf')
    .setTitle('League Bot')
    .setURL('https://github.com/fifa-mobile')
    .setDescription('<:info:751794158162935838> | Info on League Bot')
    .setThumbnail(
      'https://fifa-mobile.github.io/images/'
      + 'botIcon.jpg'
    )
    .addField('Contributors:', users.join('\n'))
    .addField('Server(s):', 'AHQ Leagues', true)
    .addField('Date created:', '2nd November 2019', true)
    .addField('Use:', 'General purpose', true)
    .setTimestamp()
    .setFooter('@fifa-mobile|AHQ League');
  _y.reply(botEmbed);
};
