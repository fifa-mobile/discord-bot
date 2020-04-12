const y = require('./base');

function ready() {
  const client = this.y.client;
  y.l(`logged in as ${client.user.tag}!`);

  client.user.setActivity(
    y.c.insource.activity.content
    , { type: y.c.insource.activity.type }
  ).then(presence => {
    console.log(
      `Activity set to ${
        presence.game ? presence.game.name : 'none'
      }`
    );
  }).catch(console.error);
}

async function message(m) {
  this.y.message = m;
  this.y.reply = text => {
    m.channel.send(text);
  };
  this.y.replyCode = text => {
    m.channel.send('```' + text + '```');
  };
  const { prefix } = y.c.main;
  if (
    !m.content.startsWith(prefix)
    || m.author.bot
  ) return;
  const args = m.content.slice(
    prefix.length
  ).split(/[\n, \s]+/);
  const cmd = args.shift().toLowerCase();
  require('./commands')(this.y, cmd, args);
}

class Bot {
  constructor(_y) {
    this.y = _y;
    this.init();
  }

  init() {
    const c = this.y.client;
    c.login(y.c.main.token);
    c.once('ready', ready.bind(this));
    c.on('message', message.bind(this));
  }
}

module.exports = (y) => new Bot(y);
