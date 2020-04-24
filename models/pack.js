'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pack = sequelize.define('Pack', {
    userid: DataTypes.INTEGER,
    packid: DataTypes.INTEGER,
    amount: DataTypes.INTEGER
  }, {});
  Pack.associate = function(models) {
    // associations can be defined here
  };
  return Pack;
};