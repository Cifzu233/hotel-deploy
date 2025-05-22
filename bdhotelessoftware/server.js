  const express = require('express');
  const cors = require('cors');
  const habitacionRoutes= require('../bdhotelessoftware/routes/habitacionroutes'); // Rutas para habitaciones
  const hotelRoutes = require('./routes/hotelRoutes'); // Rutas para hoteles
  const { Sequelize } = require('sequelize');

  // Crear una instancia de Sequelize para conectar a MySQL
  const sequelize = new Sequelize('hotel', 'root', null, {
    host: '127.0.0.1',
    dialect: 'mysql',
  });

  // Verificar la conexión a la base de datos
  sequelize.authenticate()
    .then(() => {
      console.log('Conexión a la base de datos MySQL establecida con éxito.');
    })
    .catch((error) => {
      console.error('Error al conectar con la base de datos MySQL:', error);
    });

  // Configurar el servidor Express
  const app = express();
  app.use(cors());
  app.use(express.json());

  // Usar las rutas para las habitaciones y hoteles
  app.use('/api/habitaciones', habitacionRoutes);
  app.use('/api/hoteles', hotelRoutes); // Ruta para los hoteles

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
