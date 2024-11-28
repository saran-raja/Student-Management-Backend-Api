const Sequelize = require("sequelize");
const db = require("../config/db");
const marks = require("./marksModel"); 
const student = require("./studentModel"); 

const subject = db.define("subjects", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
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
  subjectname: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, {
  timestamps: false,
});

// subject.hasMany(marks, { foreignKey: 'coursecode', sourceKey: 'coursecode' });
subject.belongsTo(student, { foreignKey: 'rollNumber', targetKey: 'rollNumber', onDelete: 'CASCADE' });

db.sync({ force: false });

module.exports = subject;
