const { PrismaClient } = require('@prisma/client');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const prisma = new PrismaClient();

const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, uploadDir);
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
            cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
        },
    }),
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only JPEG, PNG, and JPG are allowed.'));
        }
    },
    limits: { fileSize: 1 * 1024 * 1024 }, 
});


exports.getAllItem = async (req, res) => {
    try {
        const items = await prisma.item.findMany({
            include: {
                category: true, 
                restaurant: true, 
            },
        });
        res.status(200).json(items);
    } catch (error) {
        console.error('Error fetching items:', error);
        res.status(500).json({ error: 'Failed to fetch items' });
    }
};


exports.getItemById = async (req, res) => {
    const { id } = req.params;

    try {
        const item = await prisma.item.findUnique({
            where: { id: parseInt(id) },
            include: {
                category: true, 
                restaurant: true, 
            },
        });

        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }

        res.status(200).json(item);
    } catch (error) {
        console.error('Error fetching item by ID:', error);
        res.status(500).json({ error: 'Failed to fetch item by ID' });
    }
};


exports.addItem = [
    upload.single('image'),
    async (req, res) => {
        try {
            const { name, price, categoryName, restaurantName } = req.body;

            
            if (!name || !price || !categoryName || !restaurantName) {
                return res.status(400).json({ error: 'Name, price, categoryName, and restaurantName are required' });
            }

            const priceFloat = parseFloat(price);
            if (isNaN(priceFloat)) {
                return res.status(400).json({ error: 'Invalid price value' });
            }

            const image = req.file ? path.join('uploads', req.file.filename) : null;

            
            let category = await prisma.category.findUnique({
                where: { name: categoryName },
            });

           
            if (!category) {
                category = await prisma.category.create({
                    data: {
                        name: categoryName,
                    },
                });
            }

            
            const newItem = await prisma.item.create({
                data: {
                    name,
                    price: priceFloat,
                    image,
                    categoryName,   
                    restaurantName, 
                },
            });

            res.status(201).json(newItem);
        } catch (error) {
            console.error('Error creating item:', error);
            res.status(500).json({ error: 'Failed to create item', details: error.message });
        }
    },
];


exports.updateItem = [
    upload.single('image'),
    async (req, res) => {
        const { id } = req.params;
        const { name, price, categoryName, restaurantName } = req.body;

        try {
            let priceFloat;
            if (price) {
                priceFloat = parseFloat(price);
                if (isNaN(priceFloat)) {
                    return res.status(400).json({ error: 'Invalid price value' });
                }
            }

            const data = {
                ...(name && { name }),
                ...(priceFloat && { price: priceFloat }),
                ...(categoryName && { categoryName }),  
                ...(restaurantName && { restaurantName }), 
                ...(req.file && { image: path.join('uploads', req.file.filename) }),
            };

            const updatedItem = await prisma.item.update({
                where: { id: parseInt(id) },
                data,
            });

            res.status(200).json(updatedItem);
        } catch (error) {
            console.error('Error updating item:', error);
            if (error.code === 'P2025') {
                res.status(404).json({ error: 'Item not found' });
            } else {
                res.status(500).json({ error: 'Failed to update item', details: error.message });
            }
        }
    },
];


exports.deleteItem = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedItem = await prisma.item.delete({
            where: { id: parseInt(id) },
        });

        res.status(200).json({
            message: 'Item deleted successfully',
            item: deletedItem,
        });
    } catch (error) {
        console.error('Error deleting item:', error);
        if (error.code === 'P2025') {
            res.status(404).json({ error: 'Item not found' });
        } else {
            res.status(500).json({ error: 'Failed to delete item', details: error.message });
        }
    }
};
