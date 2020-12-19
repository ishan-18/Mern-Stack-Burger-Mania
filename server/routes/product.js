const router = require('express').Router();
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');
const mongoose = require('mongoose');
const Product = mongoose.model('Product');

class APIfeatures{
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }

    filtering(){
        const queryObj = {...this.queryString};
        const excludedFields = ['page', 'sort', 'limit'];
        excludedFields.forEach(el=> delete(queryObj[el]));


        let queryStr = JSON.stringify(queryObj);

        queryStr = queryStr.replace(/\b(gte|gt|lte|lt|regex)\b/g, match => '$' + match)

        this.query.find(JSON.parse(queryStr));

        return this;
    }

    sorting(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        }else{
            this.query = this.query.sort('-createdAt');
        }

        return this;
    }

    paginating(){

        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 9
        const skip = (page - 1) * limit
        this.query = this.query.skip(skip).limit(limit);

        return this;
    }

}

router.get('/product', async (req,res)=>{
    try {
        const features = new APIfeatures(Product.find(), req.query).filtering().sorting().paginating();
        const product = await features.query;
        if(product){
            res.json({
                status: 'success',
                result: product.length,
                product: product
            })
        }else{
            return res.status(401).json({msg: "No products found"});
        }
    } catch (err) {
        return res.status(500).json({err: err.message});
    }
});

router.post('/product', auth, authAdmin, async (req,res)=>{
    try {
        const {product_id, title, price, description, content, images, category} = req.body;

        if(!images){
            return res.status(401).json({msg: "No Images Selected"});
        }

        if(!product_id || !title || !price || !description || !content || !images || !category){
            return res.status(401).json({msg: "Please Enter all the fields"});
        }

        const product = await Product.findOne({product_id});
        if(product) return res.status(401).json({msg: "Product already exists"});

        const newProduct = new Product({
            product_id, 
            title: title.toLowerCase(),
            price,
            description,
            content,
            images,
            category
        });

        await newProduct.save();

        res.json({newProduct, msg: "Product Added Successfully"});

    } catch (err) {
        return res.status(500).json({err: err.message});
    }
})

router.put('/product/:id', auth, authAdmin, async (req,res)=>{
    try {
        const {title, price, description, content, images, category} = req.body;

        if(!images){
            return res.status(401).json({msg: "No Images Selected"});
        }

        const product = await Product.findOneAndUpdate({_id: req.params.id}, {
            title: title.toLowerCase(), price, description, content, images, category});

        if(product){
            res.json({msg: "Product Updated Sucessfully"});
        }else{
            return res.status(401).json({msg: "Error"});
        }
    } catch (err) {
        return res.status(401).json({err: err.message});
    }
})

router.delete('/product/:id', auth, authAdmin, async (req,res)=>{
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if(product){
            res.json({msg: "Product Deleted Successfully"});
        }
    } catch (err) {
        return res.status(500).json({err: err.message});
    }
})

module.exports = router;