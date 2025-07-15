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

exports.info = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await prisma.user.findUnique({
      select: {
        name: true,
        username: true,
        level: true,
      },
      where: {
        id: payload.id,
      },
    });

    res.json({ result: user });
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { name, password, username, level } = req.body;
    const token = req.headers.authorization.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    let oldPassword = "";

    if (password) {
      oldPassword;
    } else {
      const oldUser = await prisma.user.findUnique({
        where: {
          id: payload.id,
        },
      });

      oldPassword = oldUser.password;
    }

    await prisma.user.update({
      where: {
        id: payload.id,
      },
      data: {
        name,
        username,
        level,
        password: oldPassword,
      },
    });

    res.status(200).json({ message: "success" });
  } catch (error) {
    next(error);
  }
};
