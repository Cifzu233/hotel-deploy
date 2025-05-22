const express = require('express');
const router = express.Router();
const { Hotel } = require('../models'); // Asegúrate de que el modelo de hoteles esté correctamente importado

// Ruta para obtener todos los hoteles
router.get('/', async (req, res) => {
  try {
    const hotels = await Hotel.findAll();
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los hoteles', error });
  }
});

// Ruta para obtener un hotel por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const hotel = await Hotel.findByPk(id);
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel no encontrado' });
    }
    res.json(hotel);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el hotel', error });
  }
});

module.exports = router;

