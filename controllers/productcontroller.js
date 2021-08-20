const catchAsync = require('express-async-handler');
const Product = require('../models/productModel');

// get all products
const getProducts = catchAsync(async (req, res) => {
  const products = await Product.find({});

  // res.status(401)
  // throw new Error ('Not Authorized')

  res.json(products);
});

// get single product by id
const getProduct = catchAsync(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error(' Product not found ');
  }
});

// delete product admin only
const deleteProduct = catchAsync(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: ' product removed' });
  } else {
    res.status(404);
    throw new Error(' Product not found ');
  }
});

// create product admin only
const createProduct = catchAsync(async (req, res) => {
  const product = await Product.create({
    name: 'sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'sample brand',
    category: 'sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'sample description',
  });
  if (!product) {
    res.status(500);
    throw new Error(' something bad happed :(');
  }

  res.status(201).json(product);
});

// update product admin only
const updateProduct = catchAsync(async (req, res) => {
  let updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  if (updatedProduct) {
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error(' product not found ');
  }
});

module.exports = {
  getProducts,
  getProduct,
  deleteProduct,
  createProduct,
  updateProduct,
};
