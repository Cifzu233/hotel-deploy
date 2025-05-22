import React, { useState, useEffect } from 'react';
import { getUserById, getUserReservationHistory, updateUser } from '../services/UserService';
import '../styles/UsuarioServicio.css';

const UsuarioServicio = () => {
  const [inputUserId, setInputUserId] = useState('');
  const [usuario, setUsuario] = useState(null);
  const [reservas, setReservas] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({});
  const [error, setError] = useState('');
  const [changeLog, setChangeLog] = useState([]); // Historial de cambios

  // Cargar historial de cambios guardado en localStorage al montar el componente
  useEffect(() => {
    const historialGuardado = localStorage.getItem('historialCambiosUsuario');
    if (historialGuardado) {
      setChangeLog(JSON.parse(historialGuardado));
    }
  }, []);

  const buscarUsuario = async () => {
    setError('');
    if (!inputUserId) {
      setError('Por favor ingresa un ID de usuario');
      setUsuario(null);
      setReservas([]);
      return;
    }
    try {
      const data = await getUserById(inputUserId);
      if (!data) {
        setError('Usuario no encontrado');
        setUsuario(null);
        setReservas([]);
        return;
      }
      setUsuario(data);
      setEditedUser(data);

      try {
        const historial = await getUserReservationHistory(inputUserId);
        setReservas(historial);
      } catch {
        setReservas([]);
      }

      // Limpiar historial local y localStorage cuando se busca otro usuario
      setChangeLog([]);
      localStorage.removeItem('historialCambiosUsuario');
      setIsEditing(false);
    } catch (error) {
      setError('Error al cargar el usuario');
      setUsuario(null);
      setReservas([]);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({
      ...editedUser,
      [name]: value,
    });
  };

  const handleSave = async () => {
    try {
      const ahora = new Date().toLocaleString();
      const cambios = [];

      Object.keys(editedUser).forEach((key) => {
        if (editedUser[key] !== usuario[key]) {
          cambios.push({
            campo: key,
            antes: usuario[key],
            despues: editedUser[key],
            fecha: ahora,
          });
        }
      });

      if (cambios.length > 0) {
        const nuevosCambios = [...changeLog, ...cambios];
        setChangeLog(nuevosCambios);
        localStorage.setItem('historialCambiosUsuario', JSON.stringify(nuevosCambios));
      }

      const response = await updateUser(usuario.id, editedUser);
      setUsuario(response);
      setIsEditing(false);
      alert('Cambios guardados');
    } catch (error) {
      alert('Error al guardar los cambios');
    }
  };

  return (
    <div className="usuario-container">
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="number"
          placeholder="Ingresa ID de usuario"
          value={inputUserId}
          onChange={(e) => setInputUserId(e.target.value)}
        />
        <button onClick={buscarUsuario}>Buscar</button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!usuario && !error && <p>Ingresa un ID y haz clic en Buscar para mostrar usuario.</p>}

      {usuario && (
        <>
          <div className="usuario-header">
            <h2>Perfil de Usuario</h2>
            {!isEditing && (
              <button onClick={handleEditClick}>Editar</button>
            )}
          </div>

          <div className="usuario-info">
            <div>
              <label>Nombre</label>
              <input
                type="text"
                name="nombre"
                value={isEditing ? editedUser.nombre : usuario.nombre}
                onChange={handleChange}
                readOnly={!isEditing}
              />
            </div>
            <div>
              <label>Email</label>
              <input
                type="text"
                name="email"
                value={isEditing ? editedUser.email : usuario.email}
                onChange={handleChange}
                readOnly={!isEditing}
              />
            </div>
            <div>
              <label>Teléfono</label>
              <input
                type="text"
                name="telefono"
                value={isEditing ? editedUser.telefono : usuario.telefono}
                onChange={handleChange}
                readOnly={!isEditing}
              />
            </div>
            <div>
              <label>Fecha de creación</label>
              <input
                type="text"
                value={new Date(usuario.fecha_creacion).toLocaleString()}
                readOnly
              />
            </div>
          </div>

          {isEditing && (
            <div>
              <button onClick={handleSave}>Guardar Cambios</button>
            </div>
          )}

          {/* Historial de cambios */}
          {changeLog.length > 0 && (
            <div className="usuario-historial" style={{ marginTop: '2rem' }}>
              <h3>Historial de Cambios</h3>
              {changeLog.map((log, index) => (
                <div key={index} className="historial-item">
                  <p>
                    <strong>{log.campo}</strong>: cambió de "<em>{log.antes}</em>" a "<em>{log.despues}</em>" el {log.fecha}
                  </p>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UsuarioServicio;
