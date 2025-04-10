import express, { Express, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import { v4 as uuidv4 } from "uuid";

import { Request } from "./types";
import validation from "./middlewares/validation";

import { getBalanceSchema, updateBalanceSchema } from "./schemas";
import { userController, cronTaskController } from "./controllers";
import { runMigrations } from "./utils/migrator";
import CronService from "./utils/cron/service";

const app: Express = express();
const port = 8100;
const serverId = process.env.SERVER_ID || uuidv4();

const corsOptions = {
  origin: "*",
};

app.use(morgan("dev"));

app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: "50mb" }));

app.use((req: Request, res: Response, next: NextFunction) => {
  req.ctx = {};
  next();
});

const router = express.Router();

router.post(
  "/balance",
  validation(updateBalanceSchema),
  async (req: Request, res: Response) => {
    try {
      const balance = await userController.updateBalance(
        req.ctx?.validatedData
      );
      res.status(200).send({ balance });
    } catch (err) {
      console.log("ERROR:", err);
      res.status(400).send({ message: err.message });
    }
  }
);

router.get(
  `/balance/:userId`,
  validation(getBalanceSchema),
  async (req: Request, res: Response) => {
    try {
      const balance = await userController.getBalance(req.ctx?.validatedData);
      res.status(200).send({ balance });
    } catch (err) {
      console.log("ERROR:", err);
      res.status(400).send({ message: err.message });
    }
  }
);

router.get("/cron/task", async (req: Request, res: Response) => {
  try {
    const list = await cronTaskController.getList();
    res.status(200).send({ list });
  } catch (err) {
    console.log("ERROR:", err);
    res.status(400).send({ message: err.message });
  }
});

app.use("/api/v1", router);

(async () => {
  await runMigrations();

  const cron = new CronService(serverId);
  cron.start();

  app.listen(port, () => console.log(`Running on port ${port}`));
})();

const shutdown = async () => {
  console.log("Shutting down...");

  setTimeout(async () => {
    await cronTaskController.closeTasks(serverId);
    console.log("Pending tasks was failed because of server SIGINT/SIGTERM");
    process.exit(0);
  }, 1000);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
