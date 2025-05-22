// hotel-service/models/Hotel.js
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Hotel', {
    // Ajusta a tu tabla real:
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    availableRooms: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    stars: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'hotels',
    timestamps: false
  });
};
