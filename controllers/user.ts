import { balanceService, userService } from '../services'

const updateBalance = async ({userId, amount}) => {
    const user = await userService.getUserById(userId);

    const preCalculatedRes = user.balance + amount;

    if (preCalculatedRes < 0) {
        throw new Error('Not enough funds');
    }

    const balance = await balanceService.update(userId, amount);

    return balance;

}

const getBalance = async ({userId}) => {
    const user = await userService.getUserById(userId);
    return user.balance
}

export default {
    updateBalance,
    getBalance
}