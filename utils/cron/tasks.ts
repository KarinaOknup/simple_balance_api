import { CronTaskConfig } from "./index";
import taskConfig from "./config";
import { cronTaskService } from "../../services";

const MIN_MINUTES_TO_FINISH = 2;

const sleep = async (ms) => await new Promise((r) => setTimeout(r, ms));

let tasks: CronTaskConfig[];

Object.keys(taskConfig).forEach((name) => {
  if (!tasks) {
    tasks = [];
  }
  if (name === "mark_as_failed_tasks") {
    tasks.push({
      name,
      cronExpr: taskConfig[name],
      execute: async () => {
        console.log(`Execute ${name}...`);
        await cronTaskService.markFailedExpiredTasks();
        console.log(`${name} finished!`);
      },
    });

    return;
  }

  tasks.push({
    name,
    cronExpr: taskConfig[name],
    execute: async () => {
      console.log(`Execute ${name}...`);
      await sleep(MIN_MINUTES_TO_FINISH * 60 * 1000);
      console.log(`${name} finished!`);
    },
  });
});

export default tasks;
