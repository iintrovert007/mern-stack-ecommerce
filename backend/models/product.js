const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please enter product name'],
            trim: true,
            maxLength: [100, 'Product name cannot exceed 100 characters']
        },
        price: {
            type: Number,
            required: [true, 'Please enter product price'],
            maxLength: [5, 'Product name cannot exceed 5 characters'],
            default: 0.0
        },
        description: {
            type: String,
            required: [true, 'Please enter product description'],
        },
        ratings: {
            type: Number,
            default: 0
        },
        images: [{
            image:{
                type: String,
                required: true
            }
        }],
        category:{
            type: String,
            required: [true, 'Please enter product category for this product'],
            enum:{
                values:[
                    "Mobile Phones",
                    'Electronics',
                    'Cameras',
                    'Laptops',
                    'Accessories',
                    'Headphones',
                    'Food',
                    'Books',
                    'Clothes/Shoes',
                    'Beauty/Health',
                    'Sports',
                    'Outdoor',
                    'Home'
                ],
                message: 'Please select correct category'
            }
        },
        seller:{
            type: String,
            required: [true, 'Please enter product seller']
        },
        stock: {
            type: String,
            required: [true, 'Please enter product stock'],
            maxLength: [10, 'Product stock cannot exceed 5'],
            default: 0
        },
        numOfReviews: {
            type: Number,
            default: 0
        },
        reviews: [
            {
                name: {
                    type: String,
                    required: true
                },
                rating:{
                    type: String,
                    required: true
                },
                comment:{
                    type: String,
                    required: true
                }
            }
        ],
        createdAt: {
            type: Date,
            default: Date.now()
        }
    }
)

let schema = mongoose.model('Product', productSchema)

module.exports = schema;