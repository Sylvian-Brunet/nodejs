import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
    product_code: String,
    title: String,
    text: String,
    date: Date,
});

export const commentModel = mongoose.model('comment', commentSchema, 'comments');