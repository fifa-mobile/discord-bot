const y = require('./base');

function ready() {
  y.l(`logged in as ${this.y.client.user.tag}!`);
}

async function message(m) {
  this.y.reply = text => {
    m.channel.send(text);
  };
  const { prefix } = y.c;
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
    c.login(y.c.token);
    c.once('ready', ready.bind(this));
    c.on('message', message.bind(this));
  }
}

module.exports = (y) => new Bot(y);
