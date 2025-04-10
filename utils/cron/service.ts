import cron from "node-cron";
import { cronTaskService } from "../../services";
import tasks from "./tasks";

export type CronTaskConfig = {
  name: string;
  cronExpr: string;
  execute: () => Promise<void>;
};

class CronService {
  private serverId: string;

  constructor(serverId) {
    this.serverId = serverId;
  }

  async start() {
    tasks.forEach((task) => {
      cron.schedule(task.cronExpr, async () => {
        try {
          const { task: currentTask, isNew } = await cronTaskService.create(
            this.serverId,
            task.name
          );

          if (!isNew && task.name !== "00_mark_as_failed_tasks") {
            console.log(
              `[${task.name}] ALREADY STARTED AT ${currentTask.instanceId}`
            );
            return;
          }

          console.log(`[${task.name}] STARTED AT ${this.serverId}`);

          await task.execute();
          await cronTaskService.updateStatus(
            this.serverId,
            task.name,
            "completed"
          );
          console.log(`[${task.name}] CLOSED AT ${this.serverId}`);
        } catch (err) {
          console.error(`[${task.name}] ERROR:`, err);
          await cronTaskService.updateStatus(
            this.serverId,
            task.name,
            "failed"
          );
        }
      });
    });
  }
}

export default CronService;
