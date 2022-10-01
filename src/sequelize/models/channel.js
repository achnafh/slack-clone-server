'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Channel extends Model {

    static associate(models) {

      Channel.belongsTo(models.Team, {
        foreignKey: {
          name: 'teamId',
          field: 'team_id'
        }
      });
      //N:M relationship
      Channel.belongsToMany(models.User, {
        through: 'channel_member',
        foreignKey: {
          name: 'channelId',
          field: 'channel_id'
        }
      })
    
  }
  }
  Channel.init({
    name: DataTypes.STRING,
    public: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Channel'
  });
  return Channel;
};

// export default (sequelize, DataTypes) => {
//   const Channel = sequelize.define('channel', {
//       name: DataTypes.STRING,
//       public: DataTypes.BOOLEAN,
      
//   });

//   Channel.associate = (models) => {
//       //1:M 
//       Channel.belongsTo(models.Team, {
//           foreignKey: 'teamId'
//       });
//   };
//   return Channel;
// };