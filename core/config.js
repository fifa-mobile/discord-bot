let config = null;
const dir = '../configs/';
try {
  config = {
    main:   require(dir + 'config.json'),
    google: require(dir + 'google.json'),
    sequelize: require(dir + 'sequelize.json'),
    insource: require(dir + 'insource.json'),
    mongodb: require(dir + 'mongodb.json'),
  };
} catch (e) {
  config = {
    main:   JSON.parse(process.env.main),
    google: JSON.parse(process.env.google),
    sequelize: JSON.parse(process.env.sequelize),
    insource: require(dir + 'insource.json'),
    google: JSON.parse(process.env.mongodb),
  };
}

module.exports = config;
