'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Team extends Model {

    static associate(models) {
      Team.belongsToMany(models.User, {
        through: 'member',
        foreignKey: {
          name: 'teamId',
          field: 'team_id'
        }
    }
  );
  //1:M relationship
      Team.belongsTo(models.User, {
          foreignKey: {name: 'owner', allowNull: false}
    })
    }
  }
  Team.init({
    name: {
      type: DataTypes.STRING,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'Team'
  });
  return Team;
};
