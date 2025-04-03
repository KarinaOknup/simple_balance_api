import sequelize from './sequelize'
import { Umzug, SequelizeStorage } from 'umzug'

const umzug = new Umzug({
    migrations: {
      glob: 'database/migrations/*.ts',
    },
    context: sequelize,
    storage: new SequelizeStorage({
      sequelize,
    }),
    logger: console,
  })

type Migration = typeof umzug._types.migration;

export {
  Migration,
  umzug
}