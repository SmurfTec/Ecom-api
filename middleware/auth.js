const jwt=require('jsonwebtoken')
const User=require('../models/userModel')
const catchAsync=require('express-async-handler')

const protect=catchAsync(async(req,res,next)=>{
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
    {
        try {
            token=req.headers.authorization.split(' ')[1]
            const decode=jwt.verify(token,process.env.JWT_SECRET)
            req.user=await User.findById(decode.id).select('-password')

            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not Authorized , Token failed ')
        }
    }
    if(!token){
        res.status(401)
        throw new Error('Not authorizes , need token ')
    }
})

module.exports={
    protect
}