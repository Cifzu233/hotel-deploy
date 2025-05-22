import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/availability.css';

const API_BASE = import.meta.env.VITE_API_HABITACIONES;
const API_CHECK = import.meta.env.VITE_API_CHECK_AVAILABILITY;

const RoomAvailability = () => {
  const [date, setDate] = useState('');
  const [roomType, setRoomType] = useState('Simple');
  const [availability, setAvailability] = useState(null);
  const [habitaciones, setHabitaciones] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [nuevaHabitacion, setNuevaHabitacion] = useState({
    tipo: '',
    disponible: true,
    precio: ''
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchHabitaciones();
  }, []);

  const fetchHabitaciones = async () => {
    try {
      const res = await axios.get(API_BASE);
      setHabitaciones(res.data);
    } catch (err) {
      console.error('Error al obtener habitaciones', err);
    }
  };

  const handleCheckAvailability = async () => {
    if (!date || !roomType) {
      setError('Por favor selecciona fecha y tipo de habitación');
      setAvailability(null);
      return;
    }

    setLoading(true);
    setError('');
    setAvailability(null);

    try {
      const res = await axios.get(API_CHECK, {
        params: { date, roomType }
      });
      setAvailability(res.data.available);
    } catch (err) {
      console.error(err);
      setError('Error al verificar la disponibilidad');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      if (editId) {
        await axios.put(`${API_BASE}/${editId}`, nuevaHabitacion);
      } else {
        await axios.post(API_BASE, nuevaHabitacion);
      }
      setNuevaHabitacion({ tipo: '', disponible: true, precio: '' });
      setEditId(null);
      fetchHabitaciones();
    } catch (err) {
      console.error('Error al guardar', err);
    }
  };

  const handleEdit = (hab) => {
    setEditId(hab.id);
    setNuevaHabitacion({
      tipo: hab.tipo,
      disponible: hab.disponible,
      precio: hab.precio
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE}/${id}`);
      fetchHabitaciones();
    } catch (err) {
      console.error('Error al eliminar', err);
    }
  };

  return (
    <div className="container-flex">
      {/* Columna 1 - Reservas */}
      <div className="availability-container">
        <h2>Sistema de Reservas de Hotel</h2>

        <div className="form-group">
          <label>Selecciona una fecha:</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Selecciona un tipo de habitación:</label>
          <select value={roomType} onChange={(e) => setRoomType(e.target.value)}>
            <option value="Simple">Simple</option>
            <option value="Doble">Doble</option>
            <option value="Suite">Suite</option>
          </select>
        </div>

        <button onClick={handleCheckAvailability} disabled={loading}>
          {loading ? 'Verificando...' : 'Verificar Disponibilidad'}
        </button>

        {error && <p className="error">{error}</p>}

        {availability !== null && !error && (
          <div className="result">
            <h3>Resultado:</h3>
            <p>{availability ? '✅ Disponible' : '❌ No disponible'}</p>
          </div>
        )}
      </div>

      {/* Columna 2 - Lista de habitaciones (ANTES) */}
      <div className="crud-table">
        <h3>Lista de Habitaciones</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tipo</th>
              <th>Disponible</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {habitaciones.map((hab) => (
              <tr key={hab.id}>
                <td>{hab.id}</td>
                <td style={{ color: 'white' }}>{hab.tipo}</td>
                <td style={{ color: 'white' }}>{hab.disponible ? 'Sí' : 'No'}</td>
                <td style={{ color: 'white' }}>Q{hab.precio}</td>
                <td>
                  <button onClick={() => handleEdit(hab)}>Editar</button>
                  <button onClick={() => handleDelete(hab.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Columna 3 - Agregar habitación (DESPUÉS) */}
      <div className="crud-form">
        <h3>{editId ? 'Editar Habitación' : 'Agregar Habitación'}</h3>

        <input
          className="input-tipo"
          placeholder="Tipo (simple, doble, suite)"
          value={nuevaHabitacion.tipo}
          onChange={(e) => setNuevaHabitacion({ ...nuevaHabitacion, tipo: e.target.value })}
        />

        <input
          className="input-precio"
          type="number"
          placeholder="Precio"
          value={nuevaHabitacion.precio}
          onChange={(e) => setNuevaHabitacion({ ...nuevaHabitacion, precio: e.target.value })}
        />

        <label className="label-disponible">
          Disponible:
          <input
            type="checkbox"
            checked={nuevaHabitacion.disponible}
            onChange={(e) => setNuevaHabitacion({ ...nuevaHabitacion, disponible: e.target.checked })}
          />
        </label>

        <button className="btn-guardar" onClick={handleSave}>
          {editId ? 'Actualizar' : 'Guardar'}
        </button>
      </div>
    </div>
  );
};

export default RoomAvailability;
