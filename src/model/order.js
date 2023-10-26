const mongoose = require('mongoose')
const Schema = mongoose.Schema
let orderSchema= new Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User" 
    },
    cartItemId:[{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "CartItem"
    }],
    time:{
        type:Date,
        required:true,
        default:Date.now
    },
    addre
}
)
