'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Course }) {
      User.hasMany(Course, {
        foreignKey: {
          nameame: "userId", 
          allowNull: false,
        },
      })
    }
  };
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    emailAddress: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};