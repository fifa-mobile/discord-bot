const y = require('../core/base');
const {User} = require('../models/index.js');

module.exports = async (m, args, curr) => {
  const uid = m.author.id;
  const user = await User.findOne({where: {uid: uid}});
  const cmd = args[0];
 
 if(uid === 'placeholder'){
 if(cmd === 'uilwgbuihfuifgiufhd92'){
  await user.addPack(10);
  const url = /*upload the image and get its url*/  
  m.delete();
  const embed = new D.MessageEmbed()
    .setColor('#03fc5e')
    .setTitle('Congratulations!You have won a prize!')
    .setImage(url)
    .setURL(url)
  ;
	m.channel.send(embed);

  }
 }else{
  m.channel.send('<a:cross:751443454244159519> | You cannot use this command.');
 }
 };
