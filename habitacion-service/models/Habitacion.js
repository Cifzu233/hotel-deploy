// habitacion-service/models/Habitacion.js
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Habitacion', {
    // No incluyas "id" si lo infieres automáticamente; Sequelize lo hará.
    tipo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    disponible: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    precio: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'habitacions',  // coincide con tu tabla real
    timestamps: false
  });
};
