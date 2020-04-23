'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    username: DataTypes.STRING,
    usage: DataTypes.INTEGER
  }, {});
  Tag.associate = function(models) {
    // associations can be defined here
  };
  return Tag;
};