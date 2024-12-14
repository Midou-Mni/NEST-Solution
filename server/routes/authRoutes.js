const { Router } = require('express');
const authController = require('../controllers/authController');
const productController = require('../controllers/productController');
const { upload } = require('../middleware/uploadMiddleware');

const router = Router();

// Auth routes
router.post('/signup', authController.signup_post);
router.post('/login', authController.login_post);
router.get('/logout', authController.logout_get);

// Product routes
router.get('/products', productController.getProducts);
router.post('/products', upload.single('image'), productController.addProduct);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);
router.get('/products/:id', productController.getProduct);

module.exports = router;


