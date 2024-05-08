"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.User, {
        foreignKey: "UserId",
      });
      Order.belongsTo(models.Product, {
        foreignKey: "ProductId",
      });
      Order.belongsTo(models.Customer, {
        foreignKey: "CustomerId",
      });
    }
  }
  Order.init(
    {
      UserId: DataTypes.UUID,
      ProductId: DataTypes.UUID,
      CustomerId: DataTypes.UUID,
      quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
