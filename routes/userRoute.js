const express = require("express");
const userRouter = express.Router();
const UserController = require("../controllers/UserController");

userRouter.post("/user/signIn", UserController.signIn);
userRouter.get("/user/info", UserController.info);
userRouter.put("/user/update", UserController.update);

module.exports = userRouter;
