const Sequelize = require("sequelize");
const db = require("../config/db");
const student = db.define(
  "student",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    address: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    qualification: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    degree: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    department: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    dob: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    age: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    rollNumber: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    admissionType: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    mobileNumber: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

db.sync({ force: false });
module.exports = student;
