const y = require('./base');
function commands(_y, cmd, args) {
  try {
    require(`./commands/${cmd}`)(_y, args);
  } catch(e) {
    _y.reply('command not found!');
  }
}

module.exports = commands;
