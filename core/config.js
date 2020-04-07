let config = null;
const dir = '../configs/';
try {
  config = {
    main:   require(dir + 'config.json'),
    google: require(dir + 'google.json'),
    insource: require(dir + 'insource.json'),
  };
} catch (e) {
  config = {
    main:   JSON.parse(process.env.main),
    google: JSON.parse(process.env.google),
    insource: require(dir + 'insource.json'),
  };
}

module.exports = config;
