// src/components/HotelComponent.jsx
import React, { useState, useEffect } from 'react';
import { getHotelDetails } from '../services/HotelService';  // Llama al servicio renombrado
import '../styles/hotelService.css';  // Importa el CSS para los estilos del componente

const HotelComponent = () => {
  const [hotelDetails, setHotelDetails] = useState([]);
  const [filters, setFilters] = useState({
    location: '',
    stars: '',
    price: '',
  });

  const [filteredHotels, setFilteredHotels] = useState([]);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      const details = await getHotelDetails();
      setHotelDetails(details);
      setFilteredHotels(details);
    };

    fetchHotelDetails();
  }, []);

  // Función para aplicar los filtros
  const applyFilters = () => {
    let filtered = hotelDetails;

    if (filters.location) {
      filtered = filtered.filter(hotel =>
        hotel.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.stars) {
      filtered = filtered.filter(hotel => hotel.stars === parseInt(filters.stars));
    }

    if (filters.price) {
      const [minPrice, maxPrice] = filters.price.split('-').map(Number);
      filtered = filtered.filter(hotel => hotel.price >= minPrice && hotel.price <= maxPrice);
    }

    setFilteredHotels(filtered);
  };

  return (
    <div className="hotel-component-container">
      {/* Formulario de búsqueda */}
      <div className="filter-section">
        <h2>Buscar Hoteles</h2>
        <form>
          <label>Ubicación:</label>
          <select
            value={filters.location}
            onChange={e => setFilters({ ...filters, location: e.target.value })}
          >
            <option value="">Seleccionar...</option>
            <option value="Guatemala City">Ciudad de Guatemala</option>
            <option value="Antigua">Antigua</option>
            <option value="Monterrico">Monterrico</option>
            {/* Puedes agregar más departamentos aquí */}
          </select>

          <label>Estrellas:</label>
          <select
            value={filters.stars}
            onChange={e => setFilters({ ...filters, stars: e.target.value })}
          >
            <option value="">Seleccionar...</option>
            <option value="1">1 estrella</option>
            <option value="2">2 estrellas</option>
            <option value="3">3 estrellas</option>
            <option value="4">4 estrellas</option>
            <option value="5">5 estrellas</option>
          </select>

          <label>Precio:</label>
          <select
            value={filters.price}
            onChange={e => setFilters({ ...filters, price: e.target.value })}
          >
            <option value="">Seleccionar...</option>
            <option value="50-100">50 - 100</option>
            <option value="100-150">100 - 150</option>
            <option value="150-200">150 - 200</option>
            <option value="200-250">200 - 250</option>
            <option value="250-300">250 - 300</option>
            <option value="300-350">300 - 350</option>
            <option value="350-400">350 - 400</option>
            <option value="400-450">400 - 450</option>
            <option value="450-500">450 - 500</option>
          </select>

          <button type="button" onClick={applyFilters}>Aplicar Filtros</button>
        </form>
      </div>

      {/* Lista de hoteles */}
      <div className="hotel-list">
        <h2>Lista de Hoteles</h2>
        {filteredHotels.length === 0 ? (
          <div>No se encontraron hoteles</div>
        ) : (
          filteredHotels.map((hotel, index) => (
            <div key={index} className="hotel-item">
              <h3>{hotel.name}</h3>
              <p>Ubicación: {hotel.location}</p>
              <p>Habitaciones disponibles: {hotel.availableRooms}</p>
              <p>Precio por noche: Q{hotel.price}</p>
              <p>Estrellas: {hotel.stars} estrellas</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HotelComponent;
