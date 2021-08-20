const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
  createProduct,
} = require('../controllers/productcontroller');
const { protect, admin } = require('../middleware/auth');

router.route('/').get(getProducts).post(protect,admin,createProduct);
router
  .route('/:id')
  .get(getProduct)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

module.exports = router;
