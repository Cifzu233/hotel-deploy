// controllers/habitacionController.js

const { Habitacion } = require('../models');

// Función para verificar disponibilidad de habitación
const checkAvailability = async (req, res) => {
  const { date, roomType } = req.query;

  if (!date || !roomType) {
    return res.status(400).json({ error: 'Fecha y tipo de habitación son requeridos.' });
  }

  try {
    const habitacion = await Habitacion.findOne({
      where: { tipo: roomType }
    });

    if (!habitacion) {
      return res.status(404).json({ error: 'Tipo de habitación no encontrado.' });
    }

    return res.json({
      available: habitacion.disponible,
      roomType: habitacion.tipo,
      date: date
    });
  } catch (err) {
    console.error('Error en la consulta:', err);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Puedes agregar más funciones aquí si necesitas otras acciones, como POST, PUT, DELETE

module.exports = { checkAvailability };
