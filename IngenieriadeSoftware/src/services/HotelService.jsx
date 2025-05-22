// src/services/HotelService.jsx
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_HOTELES;

// Obtener todos los hoteles
export const getHotelDetails = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los detalles de los hoteles:', error);
    return [];
  }
};

// Crear nuevo hotel
export const createHotel = async (hotel) => {
  try {
    const response = await axios.post(API_URL, hotel);
    return response.data;
  } catch (error) {
    console.error('Error al crear hotel:', error);
    throw error;
  }
};

// Actualizar hotel por ID
export const updateHotel = async (id, hotel) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, hotel);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar hotel:', error);
    throw error;
  }
};

// Eliminar hotel por ID
export const deleteHotel = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar hotel:', error);
    throw error;
  }
};

