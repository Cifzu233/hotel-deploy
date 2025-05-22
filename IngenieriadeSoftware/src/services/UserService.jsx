import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/usuarios';

// Obtener información de un usuario por ID
export const getUserById = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
    throw error;
  }
};

// Actualizar información de un usuario
export const updateUser = async (userId, updatedData) => {
  try {
    console.log('Datos que se enviarán:', updatedData);  // Verificar los datos antes de enviarlos
    const response = await axios.put(`${API_BASE_URL}/${userId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    throw error;
  }
};

// Obtener historial de reservas de un usuario
export const getUserReservationHistory = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${userId}/reservas`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener historial de reservas:', error);
    throw error;
  }
};
