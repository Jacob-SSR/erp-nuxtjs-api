const express = require("express");
const materialRouter = express.Router();
const MaterialController = require("../controllers/MaterialController");

materialRouter.post("/material/create", MaterialController.create);
materialRouter.get("/material/list", MaterialController.list);
materialRouter.put("/material/update/:id", MaterialController.update);
materialRouter.delete("/material/remove/:id", MaterialController.remove);

module.exports = materialRouter;
