const express = require('express');
const { getProducts, newProduct, getSingleProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const router = express.Router();
const {isAuthenticatedUser, authorizeRoles } = require('../middlewares/authenticate');

router.route('/products').get(isAuthenticatedUser, getProducts);
router.route('product/:id')
                        .get(getSingleProduct)
                        
//Admin Routes
router.route('/admin/product/new').post(isAuthenticatedUser, authorizeRoles('admin'), newProduct);
router.route('admin/product/:id')
                        .put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct)
                        .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct)
module.exports = router;