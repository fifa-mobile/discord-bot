const y = require('./base');

class Bot {
  constructor(_y) {
    this.y = _y;
    this.init();
  }

  init() {
    const { prefix, token } = this.y.config;
    const Discord = require('discord.js');
    const client = new Discord.Client();

    client.login(token);

    client.once('ready', () => {
      y.l(`logged in as ${client.user.tag}!`);
    });

    client.on('message', async m => {
      if (
        !m.content.startsWith(prefix)
        || m.author.bot
      ) return;

      const args = m.content.slice(
        prefix.length
      ).split(/[\n, \s]+/);
      const cmd = args.shift().toLowerCase();

      y.l(cmd, args);
      require('./commands')(this.y, cmd, args);
    });
  }

  _() {
  }
}

module.exports = (y) => new Bot(y);
