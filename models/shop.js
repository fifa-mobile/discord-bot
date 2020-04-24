'use strict';
module.exports = (sequelize, DataTypes) => {
  const Shop = sequelize.define('Shop', {
    name: DataTypes.STRING,
    cost: DataTypes.INTEGER
  }, {});
  Shop.associate = function(models) {
    // associations can be defined here
  };
  return Shop;
};