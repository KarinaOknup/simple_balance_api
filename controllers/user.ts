import { balanceService, userService } from "../services";

const updateBalance = async ({ userId, amount }) => {
  const balance = await balanceService.update(userId, amount);

  if (!balance && amount < 0) {
    const user = await userService.getUserById(userId);

    const preCalculatedRes = user.balance + amount;

    if (preCalculatedRes < 0) {
      throw new Error("Not enough funds");
    }
  } else if (!balance) {
    throw new Error("User didnt exists");
  }

  return balance;
};

const getBalance = async ({ userId }) => {
  const user = await userService.getUserById(userId);
  return user.balance;
};

export default {
  updateBalance,
  getBalance,
};
