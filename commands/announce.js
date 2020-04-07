const y = require('../core/base');

module.exports = (_y, args) => {
  const m = _y.message;
  if (m.member.roles.find(r => r.name === 'Staff')) {
    if (!args[0]) {
      m.channel.send(
      'What do you want to announce?'
      );
      return;
    }
    let text = [];
    for (let i = 0; i < args.length; i++) {
      text.push(args[i]);
    }
    m.channel.send(text.join(' '));
    m.delete();
  } else {
    m.channel.send(
    "You do not have enough permissions"
    + " to use this command."
    );
  }
};
