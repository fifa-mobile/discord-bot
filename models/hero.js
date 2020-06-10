'use strict';
module.exports = (sequelize, DataTypes) => {
  const Hero = sequelize.define('Hero', {
    userid: DataTypes.INTEGER,
    source: DataTypes.STRING,
    hp: DataTypes.INTEGER
  }, {});
  Hero.associate = function(models) {
    // associations can be defined here
  };
  return Hero;
};