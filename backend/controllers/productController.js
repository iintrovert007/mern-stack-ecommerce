const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncError = require('../middlewares/catchAsyncError')
const APIFeatures = require('../utils/apiFeatures');

//Get Products - /api/v1/products
exports.getProducts = catchAsyncError(async (req, res, next)=>{
    const resPerPage = 2;
    const apiFeatures = new APIFeatures(Product.find(), req.query).search().filter().paginate(resPerPage);
    
    const products = await apiFeatures.query;
    res.status(200).json({
        success : true,
        count: products.length,
        products
    })
})

//Create Product - /api/v1/product/new
exports.newProduct = catchAsyncError(async (req, res, next)=>{
    
    req.body.user = req.user.id;
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    })
});

//Get Single Product - api/v1/product/:id
exports.getSingleProduct = catchAsyncError(async(req, res, next) => {
    const product = await Product.findById(req.params.id);

    if(!product) {
        return next(new ErrorHandler('Product not found', 400));
    }

    res.status(201).json({
        success: true,
        product
    })
})

//Update Product - api/v1/product/:id
exports.updateProduct = catchAsyncError(async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    
    if(!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found"
        });
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    res.status(200).json({
        success: true,
        product
    })

})

//Delete Product - api/v1/product/:id
exports.deleteProduct = catchAsyncError(async (req, res, next) =>{
    const product = await Product.findById(req.params.id);

    if(!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found"
        });
    }

    await product.remove();

    res.status(200).json({
        success: true,
        message: "Product Deleted!"
    })

});

//Create Product Review api/v1/review
exports.createProductReview = catchAsyncError( async (req, res, next) => {
    const {productId, rating, comment} = req.body;

     const review = {
        user: req.user.id,
        rating: rating,
        comment
    }

    const product = await Product.findById(productId);
    const isReviewed = product.reviews.find(review => {
       return review.user.toString() === req.user.id.toString() 
    })

    if(isReviewed) {
        product.reviews.forEach(review => {
            if(review.user.toString() === req.user.id.toString()){
                review.comment = comment;
                review.rating = rating;
            }
        })
    }else{
        product.reviews.push(review)
        product.numOfReviews = product.reviews.length;
    }
    console.log(product.reviews )
    product.ratings = product.reviews.reduce((acc, review)=>{
        return review.rating + acc 
    },0) / product.reviews.length;

    await product.save({validateBeforeSave: false});
    res.status(200).json({
        success: true
    })
})