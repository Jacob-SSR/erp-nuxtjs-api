const prisma = require("../configs/prisma");

exports.create = async (req, res, next) => {
  try {
    const { name, remark } = req.body;
    await prisma.productType.create({
      data: {
        name: name,
        remark: remark,
      },
    });
    res.status(201).json({ message: "success" });
  } catch (error) {
      next(error);
  }
};
