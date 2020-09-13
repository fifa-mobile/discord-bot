const y = require('../core/base');

module.exports = (_y, args) => {
  let msg = _y.message;
  let channel = y.client.channels.cache.find(
    ch => ch.name === 'x' || ch.name === 'one_word_story'
  );
  if (
    msg.channel.name === 'x'
    || msg.channel.name === 'one_word_story'
    || true
  ) {
    channel.messages.fetch().then(
      messages => {
        console.log('messages count: '+messages.size);
        let story = [];
        let msgs = messages.array();
        for (let i = 0; i < msgs.length; i++) {
          let m = msgs[i];
          if (
            m.toString() === '$read'
            || m.toString().startsWith('.....')
          ) continue;
          story.push(m);
        }
        story.reverse();
        msg.channel.send(':european_castle::.....'+story.join(' '));
      }
    );
  } else {
    msg.channel.send("can't arrange the story here...");
  }
  console.log('story end...', msg.channel.name);
};
