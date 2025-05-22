// src/services/HotelService.jsx
import axios from 'axios';

export const getHotelDetails = async () => {
  try {
    const response = await axios.get(import.meta.env.VITE_API_HOTELES);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los detalles de los hoteles:', error);
    return [];
  }
};
