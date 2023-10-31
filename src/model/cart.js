const mongoose= require("mongoose");
var uniqueValidator = require("mongoose-unique-validator")
var cartItemSchema = require('../model/cartItem')
const Schema = mongoose.Schema;
//function calculate the total of all cartItem with given userId
 const calculateTotal = async (userId) => {
    const cartItems = await cartItemSchema.find({userId:userId});
    let total = 0;
    cartItems.forEach(cartItem => {
        total += cartItem.productQuantity * cartItem.option.productPrice
    });
    return total;
}
let cartSchema = new Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    cartItems:[{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        default: [],
        ref: "CartItem"
    }],
    total:{
        type:Number,
        default:0
    },
    
});


cartSchema.plugin(uniqueValidator);
module.exports=mongoose.model("Cart",cartSchema);