const sequelize = require("./connection");
const data = async () => {
  console.log("entrAAA");

  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
module.exports = data;
