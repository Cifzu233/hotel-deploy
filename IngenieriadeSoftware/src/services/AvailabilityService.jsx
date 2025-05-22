// src/services/AvailabilityService.jsx
import axios from 'axios';

// Ahora sí usamos la var de Vite:
const API_URL = import.meta.env.VITE_API_CHECK_AVAILABILITY;
console.log('Check Availability URL:', API_URL); // 🛠️

export const checkRoomAvailability = async (date, roomType) => {
  try {
    const response = await axios.get(API_URL, {
      params: { date, roomType },
    });
    // response.data debe tener { available: true/false }
    return response.data;
  } catch (error) {
    console.error('Error al verificar la disponibilidad:', error);
    throw error;
  }
};
