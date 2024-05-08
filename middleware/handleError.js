const handleError = (err, req, res, next) => {
  console.log(err);
  let code = 500;
  let message = "Internal Server Error";

  if (
    err.name === "SequelizeValidationError" ||
    err.name == "SequelizeUniqueConstraintError"
  ) {
    code = 400;
    message = [];
    err.errors.forEach((el) => {
      message.push(el.message);
    });
  } else if (err.name === "Invalid authorization") {
    code = 401;
    message = "Akses Token Tidak Ada";
  }

  //
  else if (err.name === "Email/Password Salah") {
    code = 400;
    message = "Email/Password Salah";
  } else if (err.name === "Mohon Masukkan Password") {
    code = 400;
    message = "Mohon Masukkan Password";
  } else if (err.name === "Mohon Masukkan Email") {
    code = 400;
    message = "Mohon Masukkan Email";
  } else if (err.name === "Email Sudah Terdaftar") {
    code = 400;
    message = "Email Sudah Terdaftar";
  } else if (err.name === "Code Product Telah Terdaftar") {
    code = 400;
    message = "Code Product Telah Terdaftar";
  } else if (err.name === "Stock Product Tidak Cukup") {
    code = 400;
    message = `Stock Product Tidak Cukup, Sisa ${err.sisa} dari jumlah pesanan ${err.pesan}`;
  } else if (err.name === "Email Tidak Terdaftar") {
    code = 400;
    message = "Email Tidak Terdaftar";
  }

  // 404
  else if (err.name === "Id User Tidak Ditemukan") {
    code = 404;
    message = "Id User Tidak Ditemukan";
  } else if (err.name === "Id Customer Tidak Ditemukan") {
    code = 404;
    message = "Id Customer Tidak Ditemukan";
  } else if (err.name === "Id Product Tidak Ditemukan") {
    code = 404;
    message = "Id Product Tidak Ditemukan";
  } else if (err.name === "Id Order Tidak Ditemukan") {
    code = 404;
    message = "Id Order Tidak Ditemukan";
  }

  //!

  // 401 dan 403
  else if (err.name === "JsonWebTokenError") {
    code = 401;
    message = "Token Tidak Sesuai";
  } else if (err.name === "TokenExpiredError") {
    code = 401;
    message = "Token Sudah Expired";
  } else if (err.name === "API KEY Tidak Valid") {
    code = 401;
    message = "API KEY Tidak Valid";
  } else if (err.name === "Forbidden") {
    code = 403;
    message = "Anda Tidak Memiliki Hak Akses";
  }
  res.status(code).json({
    statusCode: code,
    message: message,
  });
};

module.exports = handleError;
