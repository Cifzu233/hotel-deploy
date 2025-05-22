const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Ruta para obtener usuario por ID
router.get('/:id', usuarioController.getUsuarioById);

// Ruta para actualizar usuario
router.put('/:id', usuarioController.updateUsuario);

module.exports = router;
