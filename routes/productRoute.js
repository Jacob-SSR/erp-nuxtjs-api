const express = require("express");
const productRouter = express.Router();
const ProductTypeController = require("../controllers/ProductTypeController");

productRouter.post("/productType/create", ProductTypeController.create);

module.exports = productRouter;
