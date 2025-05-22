// services/ReservaService.jsx
const API_URL = "http://localhost:5000/api/reservas"; 

export const crearReserva = async (datos) => {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos),
    });
    return await res.json();
  } catch (error) {
    console.error("Error al crear reserva:", error);
    throw error;
  }
};

export const obtenerReservas = async () => {
  try {
    const res = await fetch(API_URL);
    return await res.json();
  } catch (error) {
    console.error("Error al obtener reservas:", error);
    throw error;
  }
};
