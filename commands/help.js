const y = require('../core/base');

module.exports = (_y, args) => {
  const p = {
    prefix: y.c.prefix
  };
  let text = y.r(`index`, p);
  if (args.length !== 0) {
    try {
      text = y.r(args[0], p);
    } catch(e) {
      throw new Error(
        `Cannot find specific help for **${args[0]}**`
      );
    }
  }
  _y.reply(text);
};
