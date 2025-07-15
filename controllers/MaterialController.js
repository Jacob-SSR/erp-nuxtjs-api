const prisma = require("../configs/prisma");

exports.list = async (req, res, next) => {
  try {
    const materials = await prisma.material.findMany({
      where: {
        status: "active",
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        StockMaterial: true,
      },
    });
    res.status(200).json({ results: materials });
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { name, unit, price, remark } = req.body;
    await prisma.material.create({
      data: {
        name,
        unit,
        price: parseInt(price),
        remark,
        status: "active",
      },
    });
    res.status(201).json({ message: "success" });
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, unit, price, remark } = req.body;
    await prisma.material.update({
      where: {
        id,
      },
      data: {
        name,
        unit,
        price: parseInt(price),
        remark,
        status: "active",
      },
    });
    res.status(201).json({ message: "success" });
  } catch (error) {
    next(error);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.material.update({
      where: { id },
      data: {
        status: "inactive",
      },
    });
    res.status(200).json({ message: "success" });
  } catch (error) {
    next(error);
  }
};
