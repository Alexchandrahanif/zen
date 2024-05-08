const Controller = require("../controllers/order");
const authentication = require("../middleware/authentication");

const orderRouter = require("express").Router();

orderRouter.get("/", authentication, Controller.getAll);
orderRouter.get("/:id", authentication, Controller.getOne);
orderRouter.post("/", authentication, Controller.create);
orderRouter.patch("/:id", authentication, Controller.updateStatus);
orderRouter.delete("/:id", authentication, Controller.delete);

module.exports = orderRouter;
