import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    name: String,
    brand: String,
    bar_code: String,
    grade: Number,
    pictures: [String],
    quantity: String,
    ingredients: [Object]
});

export const productModel = mongoose.model('product', productSchema, 'products');