"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      User.hasMany(models.Order, {
        foreignKey: "UserId",
      });
    }
  }
  Product.init(
    {
      name: DataTypes.STRING,
      code: DataTypes.STRING,
      stock: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
