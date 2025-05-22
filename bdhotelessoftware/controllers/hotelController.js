const { Hotel } = require('../models');

exports.getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.findAll();
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ error: 'Hubo un error al obtener los hoteles' });
  }
};

exports.createHotel = async (req, res) => {
  try {
    const { name, location, availableRooms, price, stars } = req.body;
    const hotel = await Hotel.create({
      name,
      location,
      availableRooms,
      price,
      stars
    });
    res.status(201).json(hotel);
  } catch (error) {
    res.status(500).json({ error: 'Hubo un error al crear el hotel' });
  }
};
