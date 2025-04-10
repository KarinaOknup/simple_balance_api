import cron from "node-cron";
import { v4 as uuidv4 } from "uuid";
import { cronTaskService } from "../../services";
import tasks from "./tasks";

process.env.INSTANCE_ID = uuidv4();

const INSTANCE_ID = process.env.INSTANCE_ID;

export type CronTaskConfig = {
  name: string;
  cronExpr: string;
  execute: () => Promise<void>;
};

export const startCronService = () => {
  tasks.forEach((task) => {
    cron.schedule(task.cronExpr, async () => {
      try {
        const { task: currentTask, isNew } = await cronTaskService.create(
          INSTANCE_ID,
          task.name
        );

        if (!isNew) {
          console.log(
            `[${task.name}] ALREADY STARTED AT ${currentTask.instanceId}`
          );
          return;
        }

        console.log(`[${task.name}] STARTED AT ${INSTANCE_ID}`);

        await task.execute();
        await cronTaskService.updateStatus(INSTANCE_ID, task.name, "completed");
        console.log(`[${task.name}] CLOSED AT ${INSTANCE_ID}`);
      } catch (err) {
        console.error(`[${task.name}] ERROR:`, err);
        await cronTaskService.updateStatus(INSTANCE_ID, task.name, "failed");
      }
    });
  });
};
