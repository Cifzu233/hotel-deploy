// hotel-service/routes/hotelRoutes.js
const express = require('express');
const router = express.Router();
const { Hotel } = require('../models'); // Ajusta ruta según tu estructura

// GET all
router.get('/', async (req, res, next) => {
  try {
    const lista = await Hotel.findAll();
    res.json(lista);
  } catch (err) {
    next(err);
  }
});

// GET by ID
router.get('/:id', async (req, res, next) => {
  try {
    const h = await Hotel.findByPk(req.params.id);
    if (!h) return res.status(404).json({ message: 'No encontrado' });
    res.json(h);
  } catch (err) {
    next(err);
  }
});

// POST create
router.post('/', async (req, res, next) => {
  try {
    const nuevo = await Hotel.create(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    next(err);
  }
});

// PUT update
router.put('/:id', async (req, res, next) => {
  try {
    const [updated] = await Hotel.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ message: 'No encontrado' });
    res.json({ message: 'Actualizado' });
  } catch (err) {
    next(err);
  }
});

// DELETE
router.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await Hotel.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'No encontrado' });
    res.json({ message: 'Eliminado' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
