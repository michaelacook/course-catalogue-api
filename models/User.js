const { Sequelize, Model } = require("sequelize")

module.exports = (sequelize) => {
  class User extends Model {}
  User.init(
    {
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
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
      },
    },
    {
      sequelize,
      modelName: "user"
    }
  )
  User.associate = ({ Course }) => {
    User.hasMany(Course, {
      foreignKey: "userId",
      allowNull: false,
    })
  }
  return User
}
