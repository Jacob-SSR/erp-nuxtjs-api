const express = require("express");
const stockMaterialRouter = express.Router();
const StockMaterialController = require("../controllers/StockMaterialController");

stockMaterialRouter.post(
  "/stockMaterial/create",
  StockMaterialController.create
);
// stockMaterialRouter.get("/stockMaterial/list", StockMaterialController.list);
// stockMaterialRouter.put(
//   "/stockMaterial/update/:id",
//   StockMaterialController.update
// );
// stockMaterialRouter.delete(
//   "/stockMaterial/remove/:id",
//   StockMaterialController.remove
// );

module.exports = stockMaterialRouter;
