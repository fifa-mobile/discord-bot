'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pires = sequelize.define('Pires', {
    userid: DataTypes.INTEGER,
    packed: DataTypes.BOOLEAN
  }, {});
  Pires.associate = function(models) {
    // associations can be defined here
  };
  return Pires;
};