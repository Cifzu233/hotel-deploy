// hotel-service/server.js

// 1) Importamos y configuramos CORS
const cors = require('cors');

require('dotenv').config();
const express = require('express');
const { Sequelize } = require('sequelize');
const hotelRoutes = require('./routes/hotelRoutes');

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
  .then(() => console.log('Hotel-service: Conexión MySQL OK'))
  .catch(err => console.error('Hotel-service: Error MySQL:', err));

// 6) Rutas
app.use('/api/hoteles', hotelRoutes);

// 7) Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error('Hotel-service error:', err);
  res.status(500).json({ message: 'Error en Hoteles', detail: err.message });
});

// 8) Arranque del servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Hotel-service escuchando en puerto ${PORT}`);
});
//hola cambios