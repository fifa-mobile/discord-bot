module.exports = (m, args) => {
  const y = require('../core/base');
  args = args.filter(
    arg => !y.Discord.MessageMentions.CHANNELS_PATTERN.test(arg)
  );

  let reply = args[0];

  for (let i = 0; i < args[1] - 1; i++) {
    reply += ' ' + args[0];
  }

  const ch = m.mentions.channels.first();
  ch.send(reply);
};
