import { Op } from "sequelize";

import db from "../database/db";
import sequelize from "../database/sequelize";

const update = async (userId, amount) => {
  const [updatedRows, [updatedUser]] = await db.user.update(
    { balance: sequelize.literal(`balance + ${amount}`) },
    {
      where: {
        id: userId,
        ...(amount < 0 ? { balance: { [Op.gte]: Math.abs(amount) } } : {}),
      },
      returning: true,
    }
  );

  if (updatedRows === 0) {
    return;
  }

  return updatedUser.balance;
};

export default {
  update,
};
