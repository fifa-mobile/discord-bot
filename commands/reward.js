const y = require('../core/base');
const {User} = require('../models/index.js');

module.exports = async (m, args, curr) => {
  const uid = m.author.id;
  const user = await User.findOne({where: {uid: uid}});
  const cmd = args[0];
 
 if(uid === '326432606227005441' || uid === '604194226938314773'){
 if(cmd === 'uilwgbuihfuifgiufhd92'){
  await user.addPack(10);
  const url = 'https://raw.githubusercontent.com/fifa-mobile/discord-bot/master/commands/21504033_FR.png';  
  m.delete();
  const embed = new D.MessageEmbed()
    .setColor('#03fc5e')
    .setTitle('Congratulations!You have won a Prime Icon!')
    .setImage(url)
    .setURL(url)
  ;
	m.channel.send(embed);

  }
 }else{
  m.channel.send('<a:cross:751443454244159519> | You cannot use this command.');
 }
 };
