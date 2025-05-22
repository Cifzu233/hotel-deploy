// habitacion-service/routes/habitacionRoutes.js

const express = require('express');
const router = express.Router();
const { Habitacion } = require('../models');

// 1) check-availability ANTES que nada que pueda “atrapar” la ruta
router.get('/check-availability', async (req, res, next) => {
  try {
    const { date, roomType } = req.query;
    // Lógica de disponibilidad (aquí de ejemplo aleatoria)
    const available = Math.random() > 0.5;
    res.json({ available });
  } catch (err) {
    next(err);
  }
});

// 2) GET all
router.get('/', async (req, res, next) => {
  try {
    const lista = await Habitacion.findAll();
    res.json(lista);
  } catch (err) {
    next(err);
  }
});

// 3) GET by ID
router.get('/:id', async (req, res, next) => {
  try {
    const hab = await Habitacion.findByPk(req.params.id);
    if (!hab) {
      return res.status(404).json({ message: 'Habitación no encontrada' });
    }
    res.json(hab);
  } catch (err) {
    next(err);
  }
});

// 4) POST
router.post('/', async (req, res, next) => {
  try {
    const nueva = await Habitacion.create(req.body);
    res.status(201).json(nueva);
  } catch (err) {
    next(err);
  }
});

// 5) PUT
router.put('/:id', async (req, res, next) => {
  try {
    const [updated] = await Habitacion.update(req.body, {
      where: { id: req.params.id }
    });
    if (!updated) {
      return res.status(404).json({ message: 'Habitación no encontrada' });
    }
    res.json({ message: 'Habitación actualizada' });
  } catch (err) {
    next(err);
  }
});

// 6) DELETE
router.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await Habitacion.destroy({
      where: { id: req.params.id }
    });
    if (!deleted) {
      return res.status(404).json({ message: 'Habitación no encontrada' });
    }
    res.json({ message: 'Habitación eliminada' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
