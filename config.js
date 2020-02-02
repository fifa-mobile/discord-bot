let config = null;
try {
  config = require('./config.json');
} catch (e) {
  config = JSON.parse(process.env.config);
}

module.exports = config;
