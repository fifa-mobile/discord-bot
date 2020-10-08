const db = require('../models/index.js');
const User = db.User;

module.exports = async (m, args) => {
  const uid = m.author.id;
  const user = await User.findOne({where: {uid: uid}});
  if (!user) {
    return m.channel.send(`User not found!`);
  }
  return m.channel.send(
    '<:info:751794158162935838> | You have '
    +`${user.coins}`+'<a:coin:751813392989290546>'
  );
};

