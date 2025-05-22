// src/components/RoomAvailability.jsx
import React, { useState } from 'react';
import { checkRoomAvailability } from '../services/AvailabilityService';

const RoomAvailability = () => {
  // Inicializamos roomType con un valor por defecto
  const [date, setDate] = useState('');
  const [roomType, setRoomType] = useState('Simple');
  const [availability, setAvailability] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCheckAvailability = async () => {
    // Si no hay fecha ni tipo, no enviamos
    if (!date || !roomType) {
      setError('Por favor selecciona fecha y tipo de habitación');
      setAvailability(null);
      return;
    }

    setLoading(true);
    setError('');
    setAvailability(null);

    try {
      const result = await checkRoomAvailability(date, roomType);
      // El servicio devuelve { available: true/false }
      setAvailability(result.available);
    } catch (err) {
      console.error(err);
      setError('Error al verificar la disponibilidad');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="room-availability">
      <h2>Sistema de Reservas de Hotel</h2>

      <div>
        <label>Selecciona una fecha:</label><br/>
        <input 
          type="date" 
          value={date} 
          onChange={e => setDate(e.target.value)} 
        />
      </div>

      <div>
        <label>Selecciona un tipo de habitación:</label><br/>
        <select value={roomType} onChange={e => setRoomType(e.target.value)}>
          {/* Los valores deben coincidir con lo que tu backend espera */}
          <option value="Simple">Simple</option>
          <option value="Doble">Doble</option>
          <option value="Suite">Suite</option>
        </select>
      </div>

      <button 
        onClick={handleCheckAvailability} 
        disabled={loading}
        style={{ marginTop: '1rem' }}
      >
        {loading ? 'Verificando...' : 'Verificar Disponibilidad'}
      </button>

      {error && (
        <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>
      )}

      {availability !== null && !error && (
        <div style={{ marginTop: '1rem' }}>
          <h3>Resultado:</h3>
          <p>
            {availability
              ? '✅ ¡Habitación disponible!'
              : '❌ No hay disponibilidad para esa fecha y tipo.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default RoomAvailability;
