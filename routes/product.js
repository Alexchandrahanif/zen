const Controller = require("../controllers/product");

const authentication = require("../middleware/authentication");

const productRouter = require("express").Router();

productRouter.get("/", authentication, Controller.getAll);
productRouter.get("/:id", authentication, Controller.getOne);
productRouter.post("/", authentication, Controller.create);
productRouter.patch("/:id", authentication, Controller.update);
productRouter.delete("/:id", authentication, Controller.delete);

module.exports = productRouter;
