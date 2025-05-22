// src/components/HotelComponent.jsx
import React, { useState, useEffect } from 'react';
import {
  getHotelDetails,
  createHotel,
  updateHotel,
  deleteHotel
} from '../services/HotelService';
import '../styles/hotelService.css';

const HotelComponent = () => {
  const [hotelDetails, setHotelDetails] = useState([]);
  const [filters, setFilters] = useState({ location: '', stars: '', price: '' });
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [newHotel, setNewHotel] = useState({ name: '', location: '', availableRooms: '', price: '', stars: '' });
  const [editHotelId, setEditHotelId] = useState(null);

  useEffect(() => {
    fetchHotelDetails();
  }, []);

  const fetchHotelDetails = async () => {
    try {
      const data = await getHotelDetails();
      setHotelDetails(data);
      setFilteredHotels(data);
    } catch (error) {
      console.error('Error al obtener los hoteles:', error);
    }
  };

  const applyFilters = () => {
    let filtered = [...hotelDetails];
    if (filters.location) {
      filtered = filtered.filter(hotel => hotel.location.toLowerCase().includes(filters.location.toLowerCase()));
    }
    if (filters.stars) {
      filtered = filtered.filter(hotel => hotel.stars === parseInt(filters.stars));
    }
    if (filters.price) {
      const [min, max] = filters.price.split('-').map(Number);
      filtered = filtered.filter(hotel => hotel.price >= min && hotel.price <= max);
    }
    setFilteredHotels(filtered);
  };

  const handleSave = async () => {
    try {
      if (editHotelId) {
        await updateHotel(editHotelId, newHotel);
        setEditHotelId(null);
      } else {
        await createHotel(newHotel);
      }
      setNewHotel({ name: '', location: '', availableRooms: '', price: '', stars: '' });
      fetchHotelDetails();
    } catch (error) {
      console.error('Error al guardar el hotel:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteHotel(id);
      fetchHotelDetails();
    } catch (error) {
      console.error('Error al eliminar el hotel:', error);
    }
  };

  const handleEdit = (hotel) => {
    setNewHotel(hotel);
    setEditHotelId(hotel.id);
  };

  return (
    <div className="hotel-component-container">
      <div className="filter-section">
        <h2>Buscar Hoteles</h2>
        <label>Ubicación:</label>
        <select value={filters.location} onChange={e => setFilters({ ...filters, location: e.target.value })}>
          <option value="">Seleccionar...</option>
          <option value="Guatemala City">Ciudad de Guatemala</option>
          <option value="Antigua">Antigua</option>
          <option value="Monterrico">Monterrico</option>
          <option value="Solola">Sololá</option>
        </select>

        <label>Estrellas:</label>
        <select value={filters.stars} onChange={e => setFilters({ ...filters, stars: e.target.value })}>
          <option value="">Seleccionar...</option>
          {[1, 2, 3, 4, 5].map(star => <option key={star} value={star}>{star} estrellas</option>)}
        </select>

        <label>Precio:</label>
        <select value={filters.price} onChange={e => setFilters({ ...filters, price: e.target.value })}>
          <option value="">Seleccionar...</option>
          <option value="100 - 250">100 - 250</option>
          <option value="250 - 500">250 - 500</option>
          <option value="500 - 750">500 - 750</option>
          <option value="750 - 1000">750 - 1000</option>
          <option value="1000 - 1250">1000 - 1250</option>
          <option value="1250 - 1500">1250 - 1500</option>
        </select>

        <button onClick={applyFilters}>Aplicar Filtros</button>
        <button className="clear-filters-button" onClick={() => { setFilters({ location: '', stars: '', price: '' }); setFilteredHotels(hotelDetails); }}>
          Ver toda la lista de Hoteles
        </button>
      </div>

      <div className="hotel-management-section">
        <div className="hotel-list">
          <h2>Lista de Hoteles</h2>
          {filteredHotels.length === 0 ? (
            <div>No se encontraron hoteles</div>
          ) : (
            filteredHotels.map((hotel) => (
              <div key={hotel.id} className="hotel-item">
                <h3>{hotel.name}</h3>
                <p>Ubicación: {hotel.location}</p>
                <p>Habitaciones disponibles: {hotel.availableRooms}</p>
                <p>Precio por noche: Q{hotel.price}</p>
                <p>Estrellas: {hotel.stars} estrellas</p>
                <div className="hotel-actions">
                  <button className="edit" onClick={() => handleEdit(hotel)}>Editar</button>
                  <button className="delete" onClick={() => handleDelete(hotel.id)}>Eliminar</button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="hotel-form">
          <h2>{editHotelId ? 'Editar Hotel' : 'Agregar Hotel'}</h2>
          <input placeholder="Nombre" value={newHotel.name} onChange={e => setNewHotel({ ...newHotel, name: e.target.value })} />
          <input placeholder="Ubicación" value={newHotel.location} onChange={e => setNewHotel({ ...newHotel, location: e.target.value })} />
          <input placeholder="Habitaciones" type="number" value={newHotel.availableRooms} onChange={e => setNewHotel({ ...newHotel, availableRooms: e.target.value })} />
          <input placeholder="Precio" type="number" value={newHotel.price} onChange={e => setNewHotel({ ...newHotel, price: e.target.value })} />
          <select value={newHotel.stars} onChange={e => setNewHotel({ ...newHotel, stars: e.target.value })}>
            <option value="">Estrellas</option>
            {[1, 2, 3, 4, 5].map(star => <option key={star} value={star}>{star} estrellas</option>)}
          </select>
          <button onClick={handleSave}>Guardar</button>
        </div>
      </div>
    </div>
  );
};

export default HotelComponent;
