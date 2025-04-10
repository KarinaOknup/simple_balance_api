// CREATE TABLE && ADD FIRST USER

import { DataTypes, Sequelize } from "sequelize";

import type { Migration } from "../sequelizeMigration";

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable("users", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    balance: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.fn("NOW"),
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.fn("NOW"),
    },
  });

  await sequelize.getQueryInterface().bulkInsert("users", [
    {
      balance: 10000,
    },
  ]);
};

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().dropTable("users");
};
