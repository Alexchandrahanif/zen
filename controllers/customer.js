const { User, Customer, Selling, Product } = require("../models");
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
        order: [["name", "ASC"]],
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
          [Op.or]: [{ name: { [Op.iLike]: `%${search}%` } }],
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

      let dataCustomer = await Customer.findAndCountAll(pagination);

      let totalPage = Math.ceil(dataCustomer.count / (limit ? limit : 50));

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Mendapatkan Semua Data Customer",
        data: dataCustomer.rows,
        totaldataCustomer: dataCustomer.count,
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

      const data = await Customer.findOne({
        where: {
          id,
        },
      });

      if (!data) {
        throw { name: "Id Customer Tidak Ditemukan" };
      }

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menampilkan Data Customer",
        data: data,
      });
    } catch (error) {
      next(error);
    }
  }

  // CREATE
  static async create(req, res, next) {
    try {
      const { name, address, gender, date_of_birth } = req.body;

      let body = {
        name,
        address,
        gender,
        date_of_birth,
      };

      await Customer.create(body);

      res.status(201).json({
        statusCode: 201,
        message: "Berhasil Membuat Data Customer",
      });
    } catch (error) {
      next(error);
    }
  }

  // UPDATE
  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { name, address, gender, date_of_birth } = req.body;

      const data = await Customer.findOne({
        where: {
          id,
        },
      });

      if (!data) {
        throw { name: "Id Customer Tidak Ditemukan" };
      }

      let body = {
        name,
        address,
        gender,
        date_of_birth,
      };

      await Customer.update(body, { where: { id } });

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menampilkan Data Customer",
      });
    } catch (error) {
      next(error);
    }
  }

  // DELETE
  static async delete(req, res, next) {
    try {
      const { id } = req.params;

      const data = await Customer.findOne({
        where: {
          id,
        },
      });

      if (!data) {
        throw { name: "Id Customer Tidak Ditemukan" };
      }

      await Customer.destroy({
        where: {
          id,
        },
      });
      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menghapus Data Customer",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
