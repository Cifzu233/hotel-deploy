// routes/habitacionRoutes.js

const express = require('express');
const router = express.Router();
const { checkAvailability } = require('../controllers/habitacionController'); // Importa el controlador

// Ruta para verificar disponibilidad de habitación
router.get('/check-availability', checkAvailability);

// Puedes agregar más rutas aquí si necesitas otras funcionalidades (POST, PUT, DELETE)

module.exports = router;
