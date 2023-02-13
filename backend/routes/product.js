const express = require('express');
const multer = require('multer');
const path = require('path');
const upload = multer({storage: multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join( __dirname,'..' , 'uploads/product' ) )
    },
    filename: function(req, file, cb ) {
        cb(null, file.originalname)
    }
}) })
const { getProducts, newProduct, getSingleProduct, updateProduct, deleteProduct, createReview, getReviews, deleteReview, getAdminProducts } = require('../controllers/productController');
const router = express.Router();
const {isAuthenticatedUser, authorizeRoles } = require('../middlewares/authenticate');

router.route('/products').get( getProducts);
router.route('/product/:id')
                            .get(getSingleProduct)
                            .put(updateProduct);
                            //removing delete product as user route
                           
router.route('/review').put(isAuthenticatedUser, createReview)
                       .delete(deleteReview)
router.route('/reviews').get(getReviews)

//Admin routes
router.route('/admin/product/new').post(isAuthenticatedUser, authorizeRoles('admin'), upload.array('images'), newProduct);
router.route('/admin/products').get(isAuthenticatedUser, authorizeRoles('admin'), getAdminProducts);
router.route('/admin/products').get(isAuthenticatedUser, authorizeRoles('admin'), getAdminProducts);
// adding  delete product  as admin route
router.route('/admin/product/:id').delete(isAuthenticatedUser, authorizeRoles('admin'),  deleteProduct);
module.exports = router;