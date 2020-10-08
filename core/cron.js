const y = require('./base');
const cron = require('node-cron');
const { Quest } = require('../models/index');

// logging
cron.schedule('* * * * *', () => {
    console.log(
      'cron!!! running a task every minute '
      + Date.now()
    );
});

// reset daily reward
const timezone = 'Asia/Jakarta';
cron.schedule('* 2 * * *', async () => {
  console.log(
    `cron!!! Running a job at 02:00 at ${timezone} timezone`
  );
  Quest.update({
    daily: false,
  }, {
    where: { daily: true },
    returning: true,
    plain: true,
  })
  .then( result => {
    console.log(result);
  });
}, {
  scheduled: true,
  timezone: timezone,
});
