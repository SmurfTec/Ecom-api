const catchAsync = require('express-async-handler');
const Product = require('../models/productModel');

// get all products
const getProducts = catchAsync(async (req, res) => {
  const pageSize = 3;
  const page = Number(req.query.pageNumber) || 1;

  console.log(page);

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword, //* help us to find the object with in a  minimum keyword
          $options: 'i', //* case insensetive
        },
      }
    : {};

  //* count the products/keyword products
  const count = await Product.countDocuments({ ...keyword });
  //* either keyword is empty or value
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
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

// create Review
const createProductReview = catchAsync(async (req, res) => {
  let product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    ); //* check already review on not
    if (alreadyReviewed) {
      res.status(400);
      throw new Error(' Product already reviewed');
    }
    const review = {
      name: req.user.name,
      rating: Number(req.body.rating),
      comment: req.body.comment,
      user: req.user._id,
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;
    await product.save();

    res.json({ message: 'review added' });
  } else {
    res.status(404);
    throw new Error(' product not found ');
  }
});

// create Review
const topRatedProducts = catchAsync(async (req, res) => {
  const products=await Product.find({}).sort({rating:-1}).limit(3)
  res.json(products)

});


module.exports = {
  getProducts,
  getProduct,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  topRatedProducts
};
