const mongoose = require('mongoose')
const Schema = mongoose.Schema
let orderSchema= new Schema({
    
    cartItemsId:[{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "CartItem"
    }],
    time:{
        type:Date,
        required:true,
        default:Date.now
    },
    address:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Address"
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
    total:{
        type:Number,
        required:true,
        default:0
    }
})
module.exports = mongoose.model('Order',orderSchema)