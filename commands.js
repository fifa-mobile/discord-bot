const y = require('./base');

function commands(_y, cmd, args) {
  try {
    y.l(`executing command: ${cmd}`, args);
    require(`./commands/${cmd}`)(_y, args);
  } catch(e) {
    const c = `${y.c.prefix}${cmd}`;
    y.l(y.chalk.red(`${e.message}`));
    _y.reply(`error executing \`${c}\` command!`);
  }
}

module.exports = commands;
