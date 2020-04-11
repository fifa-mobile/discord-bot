module.exports = (_y, args) => {
  const m = _y.message;

  args = args.filter(
    arg => !_y.Discord.MessageMentions.CHANNELS_PATTERN.test(arg)
  );

  let reply = args[0];

  for (let i = 0; i < args[1] - 1; i++) {
    reply += ' ' + args[0];
  }

  const ch = m.mentions.channels.first();
  ch.send(reply);
};
