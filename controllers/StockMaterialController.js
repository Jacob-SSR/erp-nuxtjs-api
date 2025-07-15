const prisma = require("../configs/prisma");

exports.create = async (req, res, next) => {
  try {
    const { materialId, quantity, price, remark } = req.body;

    // สร้าง stock record
    await prisma.stockMaterial.create({
      data: {
        materialId,
        quantity: parseInt(quantity),
        price: parseInt(price),
        remark,
      },
    });

    // อัปเดต balance
    const material = await prisma.material.findUnique({
      where: { id: materialId },
    });

    await prisma.material.update({
      where: { id: materialId },
      data: {
        price: parseInt(price), // อัปเดตราคาด้วยถ้าต้องการ
        balance: (material?.balance || 0) + parseInt(quantity),
      },
    });

    res.status(201).json({ message: "success" });
  } catch (error) {
    next(error);
  }
};
