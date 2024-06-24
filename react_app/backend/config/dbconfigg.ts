import { configInterface } from "../Interfaces/interfaces";

export const dbConfig: configInterface = {

  HOST: "localhost",

  USER: "root",

  PASSWORD: "root",

  DB: "react_demo",

  dialect: "mysql",

  pool: {

    max: 5,

    min: 0,

    acquire: 30000,

    idle: 10000

  }

};