import { dbConfig } from "../config/dbconfigg";
import { DB } from "../Interfaces/interfaces.js";

import { Dialect, OperatorsAliases, Sequelize } from "sequelize";

export const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect as Dialect,
  operatorsAliases: 0 as unknown as OperatorsAliases,
  logging: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});



sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch((error) => {
  console.error('Unable to connect to the database: ', error);
});


const db: DB = {};

// db.Sequelize = new Sequelize;
db.sequelize = sequelize;


export default db;