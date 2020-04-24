'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserShop = sequelize.define('UserShop', {
    userid: DataTypes.INTEGER,
    shopid: DataTypes.INTEGER,
    amount: DataTypes.INTEGER
  }, {});
  UserShop.associate = function(models) {
    // associations can be defined here
  };
  return UserShop;
};