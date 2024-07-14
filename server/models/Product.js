import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
    id : {type: Number, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    images: String,
    category: String,
    color: String,
    reviews: [
        {
        userID: String,
        rating: Number,
        text: String
        }
    ]
    });

const Product = mongoose.model('Product', productSchema);

export default Product;