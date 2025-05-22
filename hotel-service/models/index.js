// hotel-service/models/index.js

const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

// Inicializa Sequelize con las variables de entorno
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
  }
);

// Importa el modelo Hotel
const Hotel = require('./Hotel')(sequelize, DataTypes);

// Si en el futuro agregas más modelos, hazlo aquí:
// const OtroModelo = require('./OtroModelo')(sequelize, DataTypes);

module.exports = {
  sequelize,
  Hotel,
  // OtroModelo,
};
