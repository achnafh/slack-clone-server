'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
// const config = require(__dirname + '/../config/config.js')[env];
// const models = path.join(__dirname, 'models')

const models = {
  User: require('./user'),
  Channel: require('./channel'),
  Message: require('./message'),
  Team: require('./team'),
};

// const sequelize = new Sequelize(`${config.url}?sslmode=no-verify`, config);
 // st sequelize = new Sequelize(database, username, password, params)
const sequelize = new Sequelize('slack', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres',
    define: {
      underscored: true
    }
});

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    models[model.name] = model;
  });

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;



// import Sequelize from 'sequelize';

// const fs = require('fs');
// const path = require('path');

// const process = require('process');
// const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';


// const sequelize = new Sequelize('try', 'postgres', 'postgres', {
//   dialect: 'postgres',
//   host: 'localhost'
// });
// // st sequelize = new Sequelize(database, username, password, params)

// const models = {
//   User: require('./user'),
//   Channel: require('./channel'),
//   Message: require('./message'),
//   Team: require('./team'),
// };

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//   })
//   .forEach(file => {
//     const model = require(path.join(__dirname, file));
//     (sequelize, Sequelize.DataTypes);
//     models[model.name] = model;
//   });

// Object.keys(models).forEach((modelName) => {
//   if ('associate' in models[modelName]) {
//     models[modelName].associate(models);
//   }
// });

// models.sequelize = sequelize;
// models.Sequelize = Sequelize;

// export default models;