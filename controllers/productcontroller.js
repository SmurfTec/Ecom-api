const catchAsync=require('express-async-handler')   
const Product=require('../models/productModel')


// get all products
const getProducts=catchAsync(async(req,res)=>{
    const products=await Product.find({})
    
    // res.status(401)
    // throw new Error ('Not Authorized')

    res.json(products)

})

// get single product by id 
const getProduct=catchAsync(async(req,res)=>{
    const product=await Product.findById(req.params.id)
    if(product){
    res.json(product)
    }else{
        res.status(404)
        throw new Error(' Product not found ')
    }
})

module.exports={
    getProducts,
    getProduct
}