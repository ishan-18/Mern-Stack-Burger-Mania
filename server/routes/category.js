const router = require('express').Router();
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');
const mongoose = require('mongoose');
const Category = mongoose.model('Category');


router.get("/category", async (req,res)=>{
    try {
        const category = await Category.find();
        if(category){
            res.json(category)
        }else{
            return res.status(401).json({msg: "No Such Category"});
        }
    } catch (err) {
        return res.status(500).json({err: err.message});
    }
})

router.post('/category', auth, authAdmin, async (req,res)=>{
    try {
        const {name} = req.body;
        if(!name) return res.status(401).json({msg: "Please Enter all the fields"});

        const category = await Category.findOne({name});
        if(category){
            return res.status(401).json({msg: "Category already exists"});
        }

        const newCategory = new Category({
            name
        });

        await newCategory.save();

        res.json({msg: "Category Added Successfully"})

    } catch (err) {
        return res.status(500).json({err: err.message});
    }
})

router.put('/category/:id', auth, authAdmin, async (req,res)=>{
    try {
        const {name} = req.body;
        const category = await Category.findOneAndUpdate({_id: req.params.id}, {name});
        res.json({msg: "Category Updated Successfully"});
    } catch (err) {
        return res.status(500).json({err: err.message});
    }
})

router.delete('/category/:id', auth, authAdmin, async (req,res)=>{
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if(category){
            res.json({msg: "Category Deleted Successfully"});
        }else{
            return res.status(401).json({msg: "Category doesnot exists"});
        }
    } catch (err) {
        return res.status(500).json({err: err.message});
    }
})

module.exports = router