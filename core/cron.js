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
cron.schedule('0 2 * * *', async () => {
  console.log(
    `cron!!! Running a job at 02:00 at ${timezone} timezone`
  );
  try {
    await Quest.update({
      daily: false,
    }, {
      where: { daily: true },
      returning: true,
      plain: true,
    });
  } catch(err) {
    console.log('reset daily reward cron error:', err.message);
  }
}, {
  scheduled: true,
  timezone: timezone,
});
