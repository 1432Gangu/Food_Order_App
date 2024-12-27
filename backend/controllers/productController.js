const multer = require('multer');
const { PrismaClient } = require('@prisma/client');
const upload = multer({ dest: 'uploads/' }); // Define upload middleware

const prisma = new PrismaClient();


exports.getAllProducts = async (req, res) => {
    try {
        const products = await prisma.product.findMany();
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
};


exports.getProductById = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await prisma.product.findUnique({
            where: {
                id: parseInt(id),
            },
        });

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch product by ID' });
    }
};

exports.addProduct = async (req, res) => {
    upload.single('image')(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ error: 'File upload failed', details: err.message });
        }

        try {
            const { name, price } = req.body;
            const image = req.file ? req.file.path : null; // store file path or handle as needed

            // Ensure price is a valid Float
            const priceFloat = parseFloat(price);
            if (isNaN(priceFloat)) {
                return res.status(400).json({ error: 'Invalid price value' });
            }

            const newProduct = await prisma.product.create({
                data: {
                    name,
                    price: priceFloat,  // Use the float value here
                    image,
                },
            });

            res.status(201).json(newProduct);
        } catch (error) {
            console.error('Error creating product:', error); // Log the specific error
            res.status(500).json({ error: 'Failed to create product', details: error.message });
        }
    });
};


exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, price, image } = req.body;

    try {
        const updatedProduct = await prisma.product.update({
            where: { id: parseInt(id) },
            data: {
                name,
                price,
                image,
                
            },
        });

        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update product' });
    }
};


exports.deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedProduct = await prisma.product.delete({
            where: { id: parseInt(id) },
        });

        res.status(200).json({ message: 'Product deleted successfully', product: deletedProduct });
    } catch (error) {
        console.error(error);

        if (error.code === 'P2025') {

            res.status(404).json({ error: 'Product not found' });
        } else {
            res.status(500).json({ error: 'Failed to delete product' });
        }
    }
};



