const y = require('../core/base');
const {User} = require('../models/index');
const types = require('../data/packTypes');

class UserTotal {
  constructor(uname, total) {
    this.uname = uname;
    this.total = total;
  }
}

module.exports = async (m, args) => {
  const users = await User.findAll({
    order: [['id']]
  });
  const data = [];
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    const uname = y.uname(m, user.uid);

    const packs = await user.getPacks();
    let total = 0;
    for (let i = 10; i > 0; i--) {
      const pack = packs.filter(
        pack => pack.packid === i
      );
      let amount = 0;
      if (pack.length) {
        amount = pack[0].amount;
      }
      const type = types[i];
      total += amount * type.price;
    }

    const userTotal = new UserTotal(uname, total);
    if (uname === 'unknown' || total < 1) continue;
    data.push(userTotal);
  }

  const result = data.sort(
    (a, b) => {
      return b.total - a.total;
    }
  );
  require('./leader/canvas')(
    m, args, result.slice(0, 9)
  );
};
