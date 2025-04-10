import { cronTaskService } from "../services";

const getList = async () => {
  const tasks = await cronTaskService.getPendingTasks();
  const list = tasks.map(({ name, instanceId, createdAt }) => ({
    name,
    instanceId,
    startedAt: createdAt,
    minSpented:
      (new Date().getTime() - new Date(createdAt).getTime()) / 1000 / 60,
  }));

  return list;
};

const closeTasks = async (serverId: string) => {
  await cronTaskService.closeTasks(serverId);
};

export default {
  getList,
  closeTasks,
};
