const express = require('express');
const  router = express.Router();
const {
  authUser,
  getuserProfile,
  registerUser,
  updateUserProfile,
  getusers,
  deleteuser,
  getUser,
  updateUser,
} = require('../controllers/userController');
const { protect, admin } = require('../middleware/auth');

router.route('/').post(registerUser).get(protect, admin, getusers);
router.post('/login', authUser);
router
  .route('/profile')
  .get(protect, getuserProfile)
  .put(protect, updateUserProfile);

router
  .route('/:id')
  .delete(protect,admin,deleteuser).get(protect,admin,getUser).put(protect,admin,updateUser)

module.exports = router;
