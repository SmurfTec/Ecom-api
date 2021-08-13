const mongoose = require('mongoose');

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Product',
        },
      },
    ],
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      country: { type: String, required: true },
      postalCode: { type: String, required: true },
    },
    paymentMethod: { type: String, require: true },
    // paymentResult:{
    //     id:{String},
    //     status:{String},
    //     update_time:{String},
    //     email_address:{String}
    // },
    taxPrice: { type: Number, require: true, default: 0.0 },
    shippingPrice: { type: Number, require: true, default: 0.0 },
    // itemsPrice:{type:Number,require:true,default:0.0},
    totalPrice: { type: Number, require: true, default: 0.0 },
    isPaid: { type: Boolean, require: true, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, required: true, default: false },
    deliveredAt: { type: Date },
  },
  {
    timestamp: true,
  }
);

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
