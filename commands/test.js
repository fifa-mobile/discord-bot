module.exports = (_y, args) => {
  const db = require('../models/index.js');

  db.Url.findAll({
    order: [
      ['createdAt', 'DESC']
    ],
    limit: 5
  }).then(urlObjs => {
    for (let i = 0; i < urlObjs.length; i++) {
      const o = urlObjs[i];
      console.log(o.id, o.url);
    }
  });
};
