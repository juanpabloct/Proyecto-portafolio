import { Sequelize } from "sequelize-typescript";
export const dbConnect = new Sequelize(
  "information portafolio",
  "postgres",
  "Juanpablo252003#",
  {
    host: "localhost",
    dialect: "postgres",
    port: 5432,
    logging: false,
  }
);
