// habitacion-service/server.js

// 1) Importamos y configuramos CORS
const cors = require('cors');

require('dotenv').config();
const express = require('express');
const { Sequelize } = require('sequelize');
const habitacionRoutes = require('./routes/habitacionRoutes');

const app = express();

// 2) Middleware CORS - debe ir antes de cualquier ruta
app.use(cors());

// 3) Middleware para JSON
app.use(express.json());

// 4) Configuración de Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
  }
);

// 5) Autenticación a la base
sequelize.authenticate()
  .then(() => console.log('Habitación-service: Conexión MySQL OK'))
  .catch(err => console.error('Habitación-service: Error MySQL:', err));

// 6) Rutas
app.use('/api/habitaciones', habitacionRoutes);

// 7) Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error('Habitación-service error:', err);
  res.status(500).json({ message: 'Error en Habitaciones', detail: err.message });
});

// 8) Arranque del servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Habitación-service escuchando en puerto ${PORT}`);
});
