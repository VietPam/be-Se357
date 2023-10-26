const mongoose = require('mongoose')
const Schema = mongoose.Schema
let orderSchema= new Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User" 
    },
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
    paymenMethod:{
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
