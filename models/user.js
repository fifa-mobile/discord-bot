'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Op } = require("sequelize");
  const User = sequelize.define('User', {
    uid: DataTypes.STRING,
    coins: DataTypes.INTEGER
  }, {});

  User.associate = function(models) {
    const {
      Shop, UserShop, Pack, Hero, Pires
    } = models;

    User.prototype.pires = async function() {
      const pires = await Pires.findOne({
        where: {userid: this.id}
      });

      if (pires) {
        return pires;
      }

      return await Pires.create({
        userid: this.id
      });
    };

    UserShop.belongsTo(Shop, {
      foreignKey: 'shopid', as: 'item'
    });

    const y = require('../core/base');

    User.prototype.uname = function(m) {
      return y.uname(m, this.uid);
    };

    User.prototype.getHero = function() {
      return Hero.findOne({
        where: {userid: this.id},
      });
    };

    User.prototype.removeHero = async function() {
      const hero = await Hero.findOne({
        where: {userid: this.id}
      });

      if (hero) {
        hero.userid = null;
        if ((await hero.save()).userid === null) {
          return true;
        } else {
          return false;
        }
      }

      return true;
    };

    User.prototype.assignHero = async function(source) {
      const hero = await Hero.findOne({
        where: {source: source}
      });

      if (hero) {
        hero.hp = 100;
        hero.userid = this.id;
        await hero.save();
        return hero;
      }

      return await Hero.create({
        userid: this.id, source: source
      });
    };

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
