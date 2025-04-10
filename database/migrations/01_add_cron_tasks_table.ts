// CREATE CRON TASKS TABLE

import { DataTypes, Sequelize } from 'sequelize'

import type { Migration } from '../sequelizeMigration';

export const up: Migration = async({ context: sequelize }) => {
    await sequelize.getQueryInterface().createTable('cron_tasks', {
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
              min: 0
            }
        },
        status:{
            type: DataTypes.ENUM('pending', 'completed', 'failed'),
        },
        createdAt: {
          type: DataTypes.DATE,
          defaultValue: Sequelize.fn('NOW')
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.fn('NOW')
        }
      });

  }

export const down: Migration = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().dropTable('cron_tasks')
  }
  