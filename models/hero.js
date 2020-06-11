'use strict';
module.exports = (sequelize, DataTypes) => {
  const Hero = sequelize.define('Hero', {
    userid: DataTypes.INTEGER,
    source: DataTypes.STRING,
    hp: DataTypes.INTEGER
  }, {});

  Hero.associate = function(models) {
    const {
      User
    } = models;

    Hero.belongsTo(User, {
      foreignKey: 'userid'
    });

    const {Op} = require('sequelize');

    Hero.prototype.getAssigned = function() {
      return Hero.findAll({
        where: {userid: {[Op.not]: null}},
      });
    };
  };

  return Hero;
};
