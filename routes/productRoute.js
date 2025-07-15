const express = require("express");
const productRouter = express.Router();
const ProductTypeController = require("../controllers/ProductTypeController");

productRouter.post("/productType/create", ProductTypeController.create);
productRouter.get("/productType/list", ProductTypeController.list);
productRouter.put("/productType/update/:id", ProductTypeController.update);
productRouter.delete("/productType/remove/:id", ProductTypeController.remove);

module.exports = productRouter;
