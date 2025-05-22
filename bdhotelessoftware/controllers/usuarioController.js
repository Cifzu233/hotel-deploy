const { Usuario } = require('../models'); // Suponiendo que tienes un modelo de Usuario

// Obtener información de un usuario por ID
exports.getUsuarioById = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(usuario);
  } catch (error) {
    console.error('Error en la obtención del usuario:', error);
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
};

// Actualizar información de un usuario
exports.updateUsuario = async (req, res) => {
  const { id } = req.params;
  const { nombre, email, telefono } = req.body;

  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Actualizamos los datos
    usuario.nombre = nombre;
    usuario.email = email;
    usuario.telefono = telefono;

    await usuario.save();  // Guardamos los cambios

    res.json(usuario);
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
};
