import { Op } from 'sequelize'
import db from "../database/db"

const create = async (instanceId: string, name: string)=> {
    const task =  await db.cronTask.findOne({ where: { name, status: 'pending'} });

    if (task != null) {
        return {task, isNew: false};
    }

    const newTask = await db.cronTask.create({
        instanceId,
        name,
        status: 'pending'
    });

    return {newTask, isNew: true};
}

const updateStatus = async (instanceId: string, name: string, status: 'pending' | 'completed' | 'failed') => {
    await db.cronTask.update({ status },{ where: { instanceId, name } })
}

const getPendingTasks = async () => {
    const tasks = await db.cronTask.findAll({
        where: {
            status: 'pending',
        },
    })
    return tasks;
}

const closeTasks = async () => {
    await db.cronTask.update({ status: 'failed' },{ where: { instanceId: process.env.INSTANCE_ID, status: 'pending' } })
}

const markFailedExpiredTasks = async () => {
    await db.cronTask.update({ status: 'failed' },{ where: { status: 'pending', createdAt: { [Op.lte]: new Date(Date.now() - 10 * 60 * 1000) } } })
}

export default {
    create,
    updateStatus,
    getPendingTasks,
    closeTasks,
    markFailedExpiredTasks
}