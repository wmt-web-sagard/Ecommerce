const Category  = require('../models/category');


const getAllCategory = async(req,res)=>{
    const allCategory = await  Category.find();

    if(!allCategory) return res.status(404).json({msg:"No category found"});
    
    res.status(200).json({data : allCategory});
}

const getCategoryById = async(req,res)=>{
    const  id = req.params.id;
    const category = await Category.findById(id);
  
    if (!category) return res.status(404).json({ msg: "Category not found" });
    res.status(200).json ({ data : category } );
}
const createNewCategory = async (req,res)=> {
    if(!req.body.categoryName){
        res.status(400).json({ msg: 'Please enter a valid category name' })
    }

    const newCat = new Category({
        categoryName : req.body.categoryName
    })
    try{
        await newCat.save()
        
        res.status(201).json(newCat)    
    }catch(err){
        console.log(err.message)
        res.status(500).json({msg:'Server Error'})
    }
}

const updateCategory = async (req,res)=>{
    const id = req.params.id
    const updates= {categoryName:req.body.categoryName} 
    let result =await Category.findByIdAndUpdate(id,updates,options)
    !result ? res.status(404).json("No such category found") :  res.status(200).json(result)
}

const deleteCategory = async (req,res)=>{
    const id = req.params.id
    let rst = await Category.findByIdAndDelete(id)
    !rst? res.status(404).json('No Such Category Found') : res.status(200).json('Deleted Successfully')
}
module.exports = {getAllCategory,getCategoryById,createNewCategory,updateCategory,deleteCategory};
