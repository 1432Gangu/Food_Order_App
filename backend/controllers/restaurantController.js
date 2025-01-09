


const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


exports.createRestaurant = async (req, res) => {
  const { restaurantName, location, contactNumber, email, description, type } = req.body;

  try {
    
    if (!restaurantName || !location || !contactNumber || !email) {
      return res.status(400).json({ error: 'restaurantName, location, contactNumber, and email are required' });
    }

    const newRestaurant = await prisma.restaurant.create({
      data: {
        restaurantName,
        location,
        contactNumber,
        email,
        description,
        type: type || 'VEG', 
      },
    });

    res.status(201).json({
      message: 'Restaurant created successfully',
      restaurant: newRestaurant,
    });
  } catch (error) {
    if (error.code === 'P2002' && error.meta.target.includes('email')) {
      return res.status(400).json({ error: 'A restaurant with this email already exists' });
    } else if (error.code === 'P2002' && error.meta.target.includes('restaurantName')) {
      return res.status(400).json({ error: 'A restaurant with this name already exists' });
    } else {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};


exports.getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await prisma.restaurant.findMany();

    if (!restaurants.length) {
      return res.status(404).json({ message: 'No restaurants found' });
    }

    res.status(200).json({
      message: 'Restaurants retrieved successfully',
      restaurants,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.updateRestaurant = async (req, res) => {
  const { id } = req.params; 
  const { restaurantName, location, contactNumber, email, description, type } = req.body;

  try {
    const updatedRestaurant = await prisma.restaurant.update({
      where: { id: parseInt(id) },
      data: {
        restaurantName,
        location,
        contactNumber,
        email,
        description,
        type,
      },
    });

    res.status(200).json({
      message: 'Restaurant updated successfully',
      restaurant: updatedRestaurant,
    });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Restaurant not found' });
    } else {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};


exports.deleteRestaurant = async (req, res) => {
  const { id } = req.params; 

  try {
    await prisma.restaurant.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ message: 'Restaurant deleted successfully' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Restaurant not found' });
    } else {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};

