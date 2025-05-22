require('dotenv').config();
const express = require('express');
const app = express();
const sequelize = require('./models/db');
const userRoutes = require('./routes/userReouter');
const cors = require('cors')
const PORT = process.env.PORT || 8000;

app.use(cors())
app.use(express.json());
app.use('/users', userRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

app.use((err, req, res, next) => {
  console.error('Error capturado:', err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to MySQL');
    await sequelize.sync(); // Crea las tablas si no existen

    app.listen(PORT,'0.0.0.0', () => console.log(`Users service on port ${PORT}`));
  } catch (err) {
    console.error('Database connection failed:', err);
  }
})();