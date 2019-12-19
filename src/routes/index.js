import { productModel } from "../db/product";

export default (app) => {
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
}