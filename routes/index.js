const customerRouter = require("./customer");
const productRouter = require("./product");
const userRouter = require("./user");
const orderRouter = require("./order");

const router = require("express").Router();

router.use("/user", userRouter);
router.use("/customer", customerRouter);
router.use("/product", productRouter);
router.use("/order", orderRouter);

module.exports = router;
