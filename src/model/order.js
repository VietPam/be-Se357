const mongoose = require('mongoose')
const cartItemSchema = require('../model/cartItem');
const Schema = mongoose.Schema
let orderSchema= new Schema({
    cartItemId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "CartItem"
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    address:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Address"
    },
    shopId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"Shop"
    },
    total:{
        type:Number,
        required:true,
        default:0
    },



    paymentMethod:{
        type:String,
        required:true,
        default:'COD'
    },
    status:{
        type:String,
        required:true,
        enum:['PENDING','DELIVERED','CANCEL','PROCESSING'],
        default:'PENDING'
    },
    time:{
        type:Date,
        required:true,
        default:Date.now
    },
})

orderSchema.pre('save', async function (next) {
    try {
        const cartItem = await cartItemSchema.findById(this.cartItemId);
        if (cartItem) {
            this.total = cartItem.productAmount;
        }
        next();
    } catch (error) {
        next(error);
    }
});
module.exports = mongoose.model('Order',orderSchema)