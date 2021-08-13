const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, require: true },
    rating: { type: Number, require: true },
    comment: { type: String, require: true },
  },
  {
    timestamp: true,
  }
);

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: { type: String, require: true },
    image: { type: String, require: true },
    brand: { type: String, require: true },
    category: { type: String, require: true },
    description: { type: String, require: true },
    reviews: [reviewSchema],
    rating: { type: Number, require: true, default: 0 },
    numReviews: { type: Number, require: true, default: 0 },
    price: { type: Number, require: true, default: 0 },
    countInStock: { type: Number, require: true, default: 0 },
  },
  {
    timestamp: true,
  }
);

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
