const express=require('express')
const router=express.Router()
const {authUser,getuserProfile, registerUser,updateUserProfile}=require('../controllers/userController')
const {protect}=require('../middleware/auth')

router.route('/').post(registerUser)
router.post('/login',authUser)
router.route('/profile').get(protect,getuserProfile).put(protect,updateUserProfile)

module.exports=router