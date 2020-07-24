const { Sequelize } = require(".")

module.exports = (sequelize) => {
  const { Model } = sequelize
  class User extends Model {}
  User.init({
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: Sequelize.STRING,
    },
    lastName: {
      type: Sequelize.STRING,
    },
    emailAddress: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
  }, {
    sequelize
  })
  User.associate = ({ Course }) => {
    User.hasMany(Course, {
      foreignKey: 'userId',
      allowNull: false,
    })
  }
  return User
}
