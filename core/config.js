let config = null;
const dir = '../configs/';
try {
  config = {
    main:   require(dir + 'config.json'),
    google: require(dir + 'google.json'),
  };
} catch (e) {
  config = JSON.parse(process.env.config);
}

module.exports = config;
