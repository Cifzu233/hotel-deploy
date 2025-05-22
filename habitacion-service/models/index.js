// habitacion-service/models/index.js
// Igual en hotel-service/models/index.js, sólo cambia los requires.

const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
  }
);

// Importa tu modelo
const Habitacion = require('./Habitacion')(sequelize, DataTypes);

// (En hotel-service sería: const Hotel = require('./Hotel')(sequelize, DataTypes); )

// Si tuvieras más modelos, los agregas aquí:
// const OtroModelo = require('./Otro')(sequelize, DataTypes);

module.exports = {
  sequelize,
  Habitacion,   // o Hotel
  // OtroModelo,
};
