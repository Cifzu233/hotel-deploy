require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,      // usersdb
  process.env.DB_USERNAME,      // root
  process.env.DB_PASSWORD,
    // test
  {
    host: process.env.DB_HOST, // mysql-users (nombre del servicio en docker-compose)
    dialect: 'mysql',
    logging: false,
  }
);

module.exports = sequelize;
