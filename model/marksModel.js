const Sequelize = require("sequelize");
const db = require("../config/db");
const student = require("./studentModel");
const subject = require("./subjectModel");

const marks = db.define(
  "marks",
  {
    rollNumber: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    coursecode: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    semester: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    mark: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
// marks.belongsTo(subject, { foreignKey: 'coursecode', targetKey: 'coursecode' });
marks.belongsTo(student, {
  foreignKey: "rollNumber",
  targetKey: "rollNumber",
  onDelete: "CASCADE",
});

db.sync({ force: false });

module.exports = marks;
