const express = require("express");
const userRouter = express.Router();
const UserController = require("../controllers/UserController");

userRouter.post("/user/signIn", UserController.signIn);

module.exports = userRouter;
