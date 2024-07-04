const sequelize = require("sequelize");
const db = new sequelize("result", "root", "root", {
  host: "localhost",
  dialect: "mysql",
});
module.exports = db;