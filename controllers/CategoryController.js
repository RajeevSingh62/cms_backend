const category=require('../models/CategoryModel');


exports. createCategory =async(req,res)=>{
    try {
        const{name}=req.body;
const newcategory=await category.create({name});
   res.status(200).json(newcategory)

    } catch (error) {
        res.status(500).json({ message: 'Category creation failed', error: error.message });
    }
};

exports.getAllCategories=async(req,res)=>{
    try {
        const categories=await category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch categories', error: error.message });
    }
};