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

exports.list = async (req, res, next) => {
  try {
    const productTypes = await prisma.productType.findMany({
      where: {
        status: "active",
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    res.json({ results: productTypes });
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, remark } = req.body;
    await prisma.productType.update({
      where: {
        id,
      },
      data: {
        name: name,
        remark: remark,
      },
    });
    res.status(200).json({ message: "success" });
  } catch (error) {
    next(error);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.productType.update({
      where: { id },
      data: {
        status: "inactive",
      },
    });
    res.status(204).json({ message: "success" });
  } catch (error) {
    next(error);
  }
};
