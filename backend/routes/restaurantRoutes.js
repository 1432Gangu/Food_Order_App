
const express = require('express');
const router = express.Router();
const {
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  getAllRestaurants,
} = require('../controllers/restaurantController');


router.get('/getAllRestaurants', getAllRestaurants);


router.post('/createNewRestaurant', createRestaurant);


router.put('/updateRestaurant/:id', updateRestaurant); 


router.delete('/deleteRestaurant/:id', deleteRestaurant); 

<<<<<<< HEAD
module.exports = router;

=======
module.exports = router;
>>>>>>> 37e3a8e109ec665c3abc5ea0f5ade938cd897b5e
