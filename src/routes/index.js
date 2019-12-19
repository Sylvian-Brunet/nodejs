import { productModel } from "../db/product";
import { commentModel } from "../db/comment";

export default (app) => {
    //GET all products
    app.get('/', async (req, res) => {
        try {
            const products = await productModel.find();
            res.status(200).json(products);
        } catch (err){
            console.log(err.message);
            return res.status(500).json({
                'error': true,
                'message': 'Error resquesting products !'
            })
        }
    });

    //GET one product by bar_code
    app.get('/product/:bar_code', async (req,res) => {
        const barCode = req.params.bar_code;
        try {
            const product = await productModel.findOne({bar_code: barCode});
            if (product)
                res.status(200).json(product);
            else {
                res.status(404).json({
                    'error': true,
                    'message': `No product with barcode ${barCode} found ..`
                })
            }
        } catch (err){
            console.log(err.message);
            return res.status(500).json({
                'error': true,
                'message': `Error resquesting product ${barCode} !`
            })
        }
    });

    //POST one product
    app.post('/product', async (req, res) => {
        try {
            const {name, brand, bar_code, grade, quantity, pictures, ingredients} = req.body;
            const request = new productModel({name, brand, bar_code, grade, quantity, pictures, ingredients});
            const inserted = await request.save();
            if(inserted && inserted._id) {
                return res.json(inserted);
            } else {
                return res.status(500).json({
                    status: "fail",
                    message: "Le produit na pas pu être inséré"
                })
            }
        } catch (err) {
            console.log(err.message);

            return res.status(500).json({
                error: true,
                message: "Error inserting new product"
            })
        }
    });

    //GET one comment by comment_id
    app.get('/comment/:comment_id', async (req,res) => {
        const commentId = req.params.comment_id;
        try {
            const comment = await commentModel.findOne({'_id': commentId});
            if (comment)
                res.status(200).json(comment);
            else {
                res.status(404).json({
                    'error': true,
                    'message': `No comment with commentId ${commentId} found ..`
                })
            }
        } catch (err){
            console.log(err.message);
            return res.status(500).json({
                'error': true,
                'message': `Error resquesting comment ${commentId} !`
            })
        }
    });

    //GET all comments by product_code
    app.get('/comments/:product_code', async (req,res) => {
        const product_code = req.params.product_code;
        try {
            const comments = await commentModel.find({'product_code': product_code});
            res.status(200).json(comments);
        } catch (err){
            console.log(err.message);
            return res.status(500).json({
                'error': true,
                'message': `Error resquesting comments for product ${product_code} !`
            })
        }
    });

    //POST one comment by product_code
    app.post('/comment/:product_code', async (req,res) => {
        try {
            const {title, text, date} = req.body;
            const product_code = req.params.product_code;
            const request = new commentModel({product_code, title, text, date});
            const inserted = await request.save();
            if(inserted && inserted._id) {
                return res.json(inserted);
            } else {
                return res.status(500).json({
                    status: "fail",
                    message: "Le commentaire na pas pu être inséré"
                })
            }
        } catch (err) {
            console.log(err.message);

            return res.status(500).json({
                error: true,
                message: "Error inserting new comment"
            })
        }
    });
}