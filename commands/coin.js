const y = require('../core/base');
const {User} = require('../models/index.js');

module.exports = async (m, args, curr) => {
  if ( m.guild.id === '593816759937794065') {
    return m.channel.send(`Sorry, you can't use the command here`);
  }
  if (
    m.member.roles.cache.find(
      r => r.name === 'Staff'
    )
  ) {
    // continue
  } else {
    return m.channel.send(
      `<a:cross:751443454244159519> | You do not have enough permissions to execute this command.`
    );
  }

  const id = Number(args[0]);

  if (!id || isNaN(id)) {
    return m.channel.send(`<:info:751794158162935838> | User ID needed!`);
  }

  const user = await User.findOne({where: {id: id}});
  const amount = Number(args[1]);

  if (!user) {
    return m.channel.send(`<a:cross:751443454244159519> | User not found!`);
  }
  if (isNaN(amount)) {
    return m.channel.send(`<:info:751794158162935838> | Amount needed`);
  }

  curr.add(user.uid, amount);

  const name = y.uname(m, user.uid);
  m.channel.send(`<a:check:751443477417426964> | Adding ${amount}<a:coin:751813392989290546> to ${name}.`);
};
