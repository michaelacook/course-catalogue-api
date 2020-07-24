const { Sequelize } = require("sequelize/types")

module.exports = (sequelize) => {
  const { Model } = sequelize
  class Course extends Model {}
  Course.init({
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.TEXT,
    },
    estimatedTime: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    materialsNeeded: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  }, {
    sequelize
  })
  Course.associate = ({ User }) => {
    Course.belongsTo(User, {
      foreignKey: 'userId',
      allowNull: false,
    })
  }
  return Course
}
