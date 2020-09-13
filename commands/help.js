const y = require('../core/base');

module.exports = (_y, args) => {
  const p = {
    prefix: y.c.main.prefix
  };
  let text = y.r(`index`, p);
  if (args.length !== 0) {
    try {
      text = y.r(args[0], p);
    } catch(e) {
      throw new Error(
        `<a:cross:751443454244159519> | Cannot find specific help for **${args[0]}**`
      );
    }
  }
  _y.reply(text);
};
