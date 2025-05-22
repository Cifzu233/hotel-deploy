// src/components/NotificationComponent.jsx
import React, { useState } from 'react';
import { sendNotification } from '../services/NotificationService';  // Llama al servicio renombrado

const NotificationComponent = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSendNotification = async () => {
    try {
      await sendNotification(email, message);  // Llamamos al servicio para enviar la notificación
      alert(`Notificación enviada a: ${email}`);
    } catch (error) {
      console.error('Error al enviar la notificación', error);
    }
  };

  return (
    <div className="notification-service">
      <h2>Servicio de Notificaciones</h2>
      <input
        type="email"
        placeholder="Ingresa tu correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input"
      />
      <textarea
        placeholder="Escribe el mensaje"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="textarea"
      />
      <button onClick={handleSendNotification} className="button">Enviar Notificación</button>
    </div>
  );
};

export default NotificationComponent;
