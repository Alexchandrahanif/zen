const { User, Customer, Order, Product } = require("../models");
const { Op } = require("sequelize");
const moment = require("moment");

class Controller {
  // GET ALL
  static async getAll(req, res, next) {
    try {
      const { limit, page, search, tanggal } = req.query;

      let pagination = {
        where: {},
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: Product,
          },
          {
            model: Customer,
          },
          {
            model: User,
            attributes: {
              exclude: ["password"],
            },
          },
        ],
        order: [["createdAt", "ASC"]],
        limit: limit ? limit : 50,
      };

      if (limit) {
        pagination.limit = limit;
      }

      if (page && limit) {
        pagination.offset = (page - 1) * limit;
      }

      if (search) {
        pagination.where = {
          [Op.or]: [{ status: { [Op.iLike]: `%${search}%` } }],
        };
      }

      if (tanggal) {
        const pagi = moment().format(`${tanggal} 00:00`);
        const masuk = moment().format(`${tanggal} 23:59`);
        pagination.where = {
          createdAt: {
            [Op.between]: [pagi, masuk],
          },
        };
      }

      let dataOrder = await Order.findAndCountAll(pagination);

      let totalPage = Math.ceil(dataOrder.count / (limit ? limit : 50));

      // SUKSES
      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Mendapatkan Semua Data Order",
        data: dataOrder.rows,
        totaldataOrder: dataOrder.count,
        totalPage: totalPage,
      });
    } catch (error) {
      next(error);
    }
  }

  // GET ONE
  static async getOne(req, res, next) {
    try {
      const { id } = req.params;

      const data = await Order.findOne({
        where: {
          id,
        },
        include: [
          {
            model: Product,
          },
          {
            model: Customer,
          },
          {
            model: User,
            attributes: {
              exclude: ["password"],
            },
          },
        ],
      });

      if (!data) {
        throw { name: "Id Order Tidak Ditemukan" };
      }

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menampilkan Data Order",
        data: data,
      });
    } catch (error) {
      next(error);
    }
  }

  // CREATE
  static async create(req, res, next) {
    try {
      const { ProductId, CustomerId, quantity } = req.body;

      let body = {
        UserId: req.user.id,
        quantity,
        status: "SEDANG_DIPROSES",
      };

      if (ProductId) {
        const data = await Product.findOne({
          where: {
            id: ProductId,
          },
        });

        if (!data) {
          throw { name: "Id Product Tidak Ditemukan" };
        }

        body.ProductId = ProductId;

        if (data.stock < quantity) {
          throw {
            name: "Stock Product Tidak Cukup",
            pesan: quantity,
            sisa: data.stock,
          };
        } else {
          await Product.update(
            { stock: data.stock - quantity },
            { where: { id: ProductId } }
          );
        }
      }
      if (CustomerId) {
        const data = await Customer.findOne({
          where: {
            id: CustomerId,
          },
        });

        if (!data) {
          throw { name: "Id Customer Tidak Ditemukan" };
        }
        body.CustomerId = CustomerId;
      }

      await Order.create(body);

      res.status(201).json({
        statusCode: 201,
        message: "Berhasil Membuat Data Order",
      });
    } catch (error) {
      next(error);
    }
  }

  // UPDATE
  static async updateStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const data = await Order.findOne({
        where: {
          id,
        },
      });

      if (!data) {
        throw { name: "Id Order Tidak Ditemukan" };
      }

      let body = {
        status,
      };

      await Order.update(body, { where: { id } });

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Mengubah Status Data Order",
      });
    } catch (error) {
      next(error);
    }
  }

  // DELETE
  static async delete(req, res, next) {
    try {
      const { id } = req.params;

      const data = await Order.findOne({
        where: {
          id,
        },
      });

      if (!data) {
        throw { name: "Id Order Tidak Ditemukan" };
      }

      const dataProduct = await Product.findOne({
        where: {
          id: data.ProductId,
        },
      });

      await Product.update(
        { stock: dataProduct.stock + data.quantity },
        { where: { id: data.ProductId } }
      );

      await Order.destroy({
        where: {
          id,
        },
      });

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menghapus Data Order",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
