const fs = require('fs');

module.exports = {
development: {
  url: '[DATABASE_URL]',
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  }
},
  test: {
    url: "127.0.0.1",
    dialect: "postgres"
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
   }
  }
}
