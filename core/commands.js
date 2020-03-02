const y = require('./base');

function commands(_y, cmd, args) {
  const p = y.c.prefix;
  try {
    y.l(`executing command: ${cmd}`, args);
    const path = `/commands/${cmd}`;
    const isFileExists = y.fs.existsSync(
      './' + path + '.js'
    );
    if (!isFileExists) {
      _y.reply(
        `There is no **${cmd}** command! `
        + `try \`${p}help\``
      );
      return;
    }
    require('../' + path)(_y, args);
  } catch(e) {
    const c = `${p}${cmd}`;
    y.l(y.chalk.red(`${e.message}`));
    _y.reply(
      `Error executing \`${c}\` command!\n`
      +
      `**details:** ${e.message}`
    );
  }
}

module.exports = commands;
