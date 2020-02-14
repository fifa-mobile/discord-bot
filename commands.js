const y = require('./base');

function commands(_y, cmd, args) {
  try {
    y.l(`executing command: ${cmd}`, args);
    require(`./commands/${cmd}`)(_y, args);
  } catch(e) {
    const c = `${y.c.prefix}${cmd}`;
    y.l(y.chalk.red(`failed! no file for it`));
    _y.reply(`command \`${c}\` not found!`);
  }
}

module.exports = commands;
