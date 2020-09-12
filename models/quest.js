'use strict';
module.exports = (sequelize, DataTypes) => {
  const Quest = sequelize.define('Quest', {
    userid: DataTypes.INTEGER,
    daily: DataTypes.BOOLEAN
  }, {});
  Quest.associate = function(models) {
    // associations can be defined here
  };
  return Quest;
};