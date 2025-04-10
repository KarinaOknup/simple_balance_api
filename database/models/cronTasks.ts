import sequelize from "../sequelize";
import {
  DataTypes,
  Optional,
  Model,
  CreationOptional,
  Sequelize,
} from "sequelize";

type CronTaskStatusType = "pending" | "completed" | "failed";

type CronTasksAttributes = {
  id: number;
  name: string;
  status: CronTaskStatusType;
  instanceId: string;
  createdAt: Date;
  updatedAt: Date;
};

type CronTasksCreationAttributes = Optional<CronTasksAttributes, "id">;

class CronTasks extends Model<
  CronTasksAttributes,
  CronTasksCreationAttributes
> {
  declare id: number;
  declare name: string;
  declare status: CronTaskStatusType;
  declare instanceId: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

CronTasks.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    instanceId: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        min: 0,
      },
    },
    status: {
      type: DataTypes.ENUM("pending", "completed", "failed"),
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.fn("NOW"),
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.fn("NOW"),
    },
  },
  {
    sequelize,
    tableName: "cron_tasks",
  }
);

export default CronTasks;
