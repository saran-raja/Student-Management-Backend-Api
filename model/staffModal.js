const Sequelize = require("sequelize");
const db = require("../config/db");
const Staff = db.define("Staff", {
  department: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: "Users",
      key: "id",
    },
    allowNull: false,
  },
});
Staff.associate = (models) => {
  Staff.belongsTo(models.User, {
    foreignKey: "userId",
    as: "user",
  });
};

db.sync({ force: false });

module.exports = Staff;
