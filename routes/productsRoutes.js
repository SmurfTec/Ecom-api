const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
  createProduct,
  createProductReview,
  topRatedProducts,
} = require('../controllers/productcontroller');
const { protect, admin } = require('../middleware/auth');

router.route('/').get(getProducts).post(protect,admin,createProduct);
router.route('/topProducts').get(topRatedProducts)
router
  .route('/:id')
  .get(getProduct)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

router
  .route('/:id/review')
  .post(protect,createProductReview)


module.exports = router;
