const Sequelize = require("sequelize");
const db = require("../config/db");

const role = db.define("role", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
});

db.sync({ force: false });


module.exports = role;
