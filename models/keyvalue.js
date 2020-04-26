'use strict';
module.exports = (sequelize, DataTypes) => {
  const KeyValue = sequelize.define('KeyValue', {
    key: DataTypes.STRING,
    value: DataTypes.TEXT
  }, {});
  KeyValue.associate = function(models) {
    // associations can be defined here
  };
  return KeyValue;
};