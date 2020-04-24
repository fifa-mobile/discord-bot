'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    uid: DataTypes.STRING,
    coins: DataTypes.INTEGER
  }, {});

  User.associate = function(models) {
    const {Shop, UserShop} = models;

    UserShop.belongsTo(Shop, {
      foreignKey: 'shopid', as: 'item'
    });

    User.prototype.addItem = async function(item) {
      const useritem = await UserShop.findOne({
        where: {userid: this.id, shopid: item.id}
      });

      if (useritem) {
        useritem.amount += 1;
        return useritem.save();
      }

      return await UserShop.create({
        userid: this.id, shopid: item.id, amount: 1
      });
    };

    User.prototype.getItems = function() {
      return UserShop.findAll({
        where: {userid: this.id},
        include: ['item'],
      });
    };
  };
  return User;
};
