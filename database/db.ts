import CronTasks from "./models/cronTasks";
import User from "./models/user";

const db = {
    user: User,
    cronTask: CronTasks
}

export default db