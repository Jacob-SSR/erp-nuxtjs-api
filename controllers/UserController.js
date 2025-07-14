const prisma = require("../configs/prisma");
const jwt = require("jsonwebtoken");
const createError = require("../utils/createError");

exports.signIn = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username.trim() || !password.trim()) {
      return createError(400, "Username and Password are required");
    }
    const user = await prisma.user.findFirst({
      where: {
        username: username,
        password: password,
        status: "active",
      },
    });
    if (!user) {
      return createError(401, "Invalid Username or Password");
    }

    const payload = {
      id: user.id,
      username: user.username,
    };
    const key = process.env.JWT_SECRET_KEY;
    const token = jwt.sign(payload, key, { expiresIn: "30d" });

    res.json({ token: token, level: user.level, id: user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
