'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {
      User.belongsToMany(models.Team, {
        through: 'member',
        foreignKey: {
          name: 'userId',
          field: 'user_id'
        },
      });

      //N:M relationship
      User.belongsToMany(models.Channel, {
        through: 'channel_member',
        foreignKey: {
          name: 'userId',
          field: 'user_id'
        },
      });
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User'
  });
  return User;
};
