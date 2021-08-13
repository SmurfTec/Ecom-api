const catchAsync=require('express-async-handler')
const Order=require('../models/orderModel')

// create new Order
const addOrderItems=catchAsync(async(req,res)=>{

    const {orderItems,shippingAddress,paymentMethod,itemsPrice,
        taxPrice,shippingPrice,totalPrice}  = req.body
        
    if(orderItems && orderItems.length === 0 ){
        res.status(400)
        console.log('no order items ')
        throw new Error('No order Items')   
        return
    }else{
        const order=new Order({
            orderItems,user:req.user._id,shippingAddress,paymentMethod,
            itemsPrice,taxPrice,shippingPrice,totalPrice
        })
        const orderCreated=await order.save()
        res.status(201).json(orderCreated)
    }
})


// get order by ID 
const getOrderById=catchAsync(async(req,res)=>{
    const order=await Order.findById(req.params.id).populate('user','name email')
    if(order){
        res.json(order)
    }else{
        res.status(404)
        throw new Error('Order not found')
    }
})


// get order by ID 
const updateOrderToPaid=catchAsync(async(req,res)=>{
    const order=await Order.findById(req.params.id)
    if(order){
        order.isPaid=true
        order.paidAt=Date.now()
        // order.paymentResult={
        //     id:req.body.id,
        //     status:req.body.status,
        //     update_time:req.body.update_time,
        //     email_address:req.body.payer.email_address
        // }
        const updatedOrder=await order.save()
        res.status(200).json(updatedOrder)

    }else{
        res.status(404)
        throw new Error('Order not found')
    }
})


module.exports={
   addOrderItems,
   getOrderById,
   updateOrderToPaid
}