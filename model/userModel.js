const Role = require("./roleModal"); // Import Role model

const Sequelize = require("sequelize");
const db = require("../config/db");

const User = db.define(
  "User",
  {
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },

    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

User.belongsTo(Role, { foreignKey: "roleId" });

module.exports = User;
