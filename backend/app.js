const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);

// Fallback route for 404
app.use((req, res) => {
    res.status(404).send('Route not found');
});

module.exports = app; // Ensure the app instance is exported





// const express = require("express");
// const cors = require("cors");
// const userRoutes = require('./routes/userRoutes');
// // const userRoutes = require("./routes/userRoutes");
// // const authRoutes = require("./routes/authRoutes");

// const app = express();

// // Use CORS middleware
// app.use(
//   cors({
//     origin: "http://localhost:5173", // Allow requests from this origin
//     methods: "GET,POST,PUT,DELETE", // Allowed methods
//     credentials: true, // If cookies/auth headers are used
//   })
// );

// app.use(express.json());

// // API Routes
// app.use("/api/users", userRoutes);
// // app.use("/api/auth", authRoutes); // Adding authRoutes for authentication-related routes

// // 404 handler
// app.use((req, res) => {
//   res.status(404).send("Route not found");
// });

// app.post('/register', (req, res) => {
//     const { name, email, password } = req.body;
//     // Perform validation and save to database
//     res.status(200).json({ message: "User registered successfully" });
//   });
  

// app.listen(5001, () => {
//     console.log("Server is running on http://localhost:5001");
//   });
  

// module.exports = app;
