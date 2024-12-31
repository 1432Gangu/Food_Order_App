const express = require('express');
const { getAllProducts, getProductById, addProduct, updateProduct, deleteProduct, } = require('../controllers/productController');


const router = express.Router();


router.get('/getAllProducts', getAllProducts);

router.get('/getSingleProduct/:id', getProductById);

router.post('/createProduct', addProduct);

router.put('/updateProduct/:id', updateProduct);

router.delete('/deleteProduct/:id', deleteProduct);


module.exports = router;



// const express = require('express');
// const { getAllProducts, getProductById, addProduct, updateProduct, deleteProduct, } = require('../controllers/productController');


// const multer = require('multer');
// const router = express.Router();
// const upload = multer({ dest: 'uploads/' });


// router.get('/getAllProducts', getAllProducts);

// router.get('/getSingleProduct/:id', getProductById);

// router.post('/createProduct', upload.single('image'), addProduct);

// router.put('/updateProduct/:id', upload.single('image'), updateProduct);

// router.delete('/deleteProduct/:id', deleteProduct);


// module.exports = router;




