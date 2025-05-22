module.exports = (sequelize, DataTypes) => {
    const Usuario = sequelize.define('Usuarios', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      telefono: {
        type: DataTypes.STRING,
        validate: {
          isNumeric: true,
        },
      },
      fecha_creacion: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    }, {
      tableName: 'usuarios',
      timestamps: true,
      createdAt: 'fecha_creacion',
      updatedAt: false,
    });
  
    return Usuario;
  };
  