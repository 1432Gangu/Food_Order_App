const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const restaurantRoutes = require('./routes/restaurantRoutes');



dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use('/api/v1/products', productRoutes); 
app.use('/api/v1/restaurants', restaurantRoutes);

app.use((req, res) => {
    res.status(404).send('Route not found');
});

module.exports = app;