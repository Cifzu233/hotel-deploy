// src/services/AvailabilityService.jsx
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_HABITACIONES; 
// Verificar disponibilidad
export const checkRoomAvailability = async (date, roomType) => {
  try {
    const response = await axios.get(`${BASE_URL}/check-availability`, {
      params: { date, roomType },
    });
    return response.data; // { available: true/false }
  } catch (error) {
    console.error('Error al verificar disponibilidad:', error);
    throw error;
  }
};

// Obtener todas las habitaciones (READ)
export const getAllRooms = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error al obtener habitaciones:', error);
    return [];
  }
};

// Crear nueva habitación (CREATE)
export const createRoom = async (roomData) => {
  try {
    const response = await axios.post(BASE_URL, roomData);
    return response.data;
  } catch (error) {
    console.error('Error al crear habitación:', error);
    throw error;
  }
};

// Actualizar habitación (UPDATE)
export const updateRoom = async (id, roomData) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, roomData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar habitación:', error);
    throw error;
  }
};

// Eliminar habitación (DELETE)
export const deleteRoom = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar habitación:', error);
    throw error;
  }
};