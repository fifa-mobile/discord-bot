'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Op } = require("sequelize");
  const User = sequelize.define('User', {
    uid: DataTypes.STRING,
    coins: DataTypes.INTEGER
  }, {});

  User.associate = function(models) {
    const {Shop, UserShop, Pack} = models;

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

    User.prototype.addPack = async function(
      packid, reduce = 0
    ) {
      const pack = await Pack.findOne({
        where: {userid: this.id, packid: packid}
      });

      if (pack) {
        if (reduce) {
          pack.amount -= reduce;
        } else {
          pack.amount += 1;
        }
        return pack.save();
      }

      return await Pack.create({
        userid: this.id, packid: packid, amount: 1
      });
    };

    User.prototype.getPack = function(packid) {
      return Pack.findOne({
        where: {userid: this.id, packid: packid},
      });
    };

    User.prototype.getPacks = function() {
      return Pack.findAll({
        where: {
          userid: this.id,
          amount: {
            [Op.gt]: 0,
          },
        },
        order: [['packid', 'DESC']],
      });
    };
  };
  return User;
};
