// hotel-service/routes/hotelRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/usuario'); // Ajusta ruta según tu estructura

// GET all
router.get('/', async (req, res, next) => {
  try {
    const lista = await User.findAll();
    res.json(lista);
  } catch (err) {
    next(err);
  }
});

// GET by ID
router.get('/:id', async (req, res, next) => {
  try {
    const usuario = await User.findByPk(req.params.id);
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    res.json(usuario);
  } catch (err) {
    next(err);
  }
});

// POST create
// router.post('/', async (req, res, next) => {
//   try {
//     const nuevo = await Hotel.create(req.body);
//     res.status(201).json(nuevo);
//   } catch (err) {
//     next(err);
//   }
// });

// PUT update
router.put('/:id', async (req, res, next) => {
  try {
    const { nombre, email, telefono } = req.body;
    const usuario = await User.findByPk(req.params.id);
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    usuario.nombre = nombre || usuario.nombre;
    usuario.email = email || usuario.email;
    usuario.telefono = telefono || usuario.telefono;

    await usuario.save();
    res.json(usuario);
  } catch (err) {
    next(err);
  }
});

// DELETE
// router.delete('/:id', async (req, res, next) => {
//   try {
//     const deleted = await Hotel.destroy({ where: { id: req.params.id } });
//     if (!deleted) return res.status(404).json({ message: 'No encontrado' });
//     res.json({ message: 'Eliminado' });
//   } catch (err) {
//     next(err);
//   }
// });

module.exports = router;
