const y = require('../base');

module.exports = (_y, args) => {
  const text = y.fs.readFileSync(
    `./commands/files/help.md`, 'utf8'
  );
  _y.reply(text);
};
