const express = require("express");
const { loginAdmin } = require("../controllers/adminController");

const router = express.Router();

router.post("/login", loginAdmin);

<<<<<<< HEAD
module.exports = router;



// const express = require("express");
// const { loginAdmin } = require("../controllers/adminController");
// const { verifyToken, checkRole } = require("../middlewares/authMiddleware");

// const router = express.Router();

// // Admin login route
// router.post("/login", loginAdmin);

// // Protected admin route example
// router.get("/dashboard", verifyToken, checkRole("admin"), (req, res) => {
//     res.status(200).json({
//         message: "Admin dashboard accessed",
//         user: req.user, // Populated by the `verifyToken` middleware
//     });
// });

// module.exports = router;

=======
module.exports = router;
>>>>>>> 37e3a8e109ec665c3abc5ea0f5ade938cd897b5e
