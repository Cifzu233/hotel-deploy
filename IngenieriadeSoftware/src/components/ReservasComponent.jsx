import React, { useState } from "react";
import { crearReserva } from "../services/ReservasService";

const ReservaComponent = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    fechaEntrada: "",
    fechaSalida: ""
  });

  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await crearReserva(formData);
      setMensaje("Reserva creada exitosamente");
      setFormData({
        nombre: "",
        email: "",
        fechaEntrada: "",
        fechaSalida: ""
      });
    } catch (error) {
      setMensaje("Hubo un error al crear la reserva");
    }
  };

  return (
    <div>
      <h2>Reservar habitación</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Fecha de entrada:</label>
          <input type="date" name="fechaEntrada" value={formData.fechaEntrada} onChange={handleChange} required />
        </div>
        <div>
          <label>Fecha de salida:</label>
          <input type="date" name="fechaSalida" value={formData.fechaSalida} onChange={handleChange} required />
        </div>
        <button type="submit">Reservar</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default ReservaComponent;
