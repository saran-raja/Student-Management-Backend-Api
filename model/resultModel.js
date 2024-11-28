const Sequelize = require("sequelize");
const db = require("../config/db");
const student = require("./studentModel");

const result = db.define("results", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  dob: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
  rollNumber: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  semester: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  subject: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  mark: {
    type: Sequelize.STRING,
    allowNull: false,
  },
},{
  timestamps: false
});
result.belongsTo(student, { foreignKey: 'rollNumber', targetKey: 'rollNumber', onDelete: 'CASCADE' });


db.sync({ force: false });

module.exports = result;
