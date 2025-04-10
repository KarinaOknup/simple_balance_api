import db from "../database/db";

const getUserById = async (userId) => {
  const user = await db.user.findByPk(userId);

  if (!user) {
    throw new Error("User didnt exists");
  }

  return user;
};

export default {
  getUserById,
};
