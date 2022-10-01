'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    
    static associate(models) {
      Message.belongsTo(models.Channel, {
        foreignKey: {
          name: 'channelId',
          field: 'channel_id'
        },
      });
      Message.belongsTo(models.User, {
        foreignKey: {
          name: 'userId',
          field: 'user_id'
        },
      });
    }
  }
  Message.init({
    text: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Message'
  });
  return Message;
};

// export default (sequelize, DataTypes) => {
//   const Message = sequelize.define('message', {
//       text: DataTypes.STRING,
//   });

//   Message.associate = (models) => {
//       //1:M Relationship
//       Message.belongsTo(models.Channel, {
//           foreignKey: 'channelId'
//       });
//       Message.belongsTo(models.User, {
//           foreignKey: 'userId'
//       });
//   };
//   return Message;
// };