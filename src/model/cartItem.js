const mongoose= require("mongoose");
var uniqueValidator = require("mongoose-unique-validator")
const moment = require("moment");
const Product = require("./product");
const Schema = mongoose.Schema;

let cartItemSchema = new Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"User",
    },
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product"
    },
    nameProduct: {
        type: String,
    },
    productQuantity:{
        type: Number,
        default:1
    },
    productDelivery:{ // ngày giao hàng
        type: Date,
        required:true,
        default:Date()
    },
    imageDisplay: {
        type: String,
    },
    price:{
        type: Number,
        required: true,
        default:0,
    },
    option:{
        type: Map,
        of: String,
        default: {
            "Size":  "S"
        }
    },
    
});
cartItemSchema.pre('save', async function(next) {
    try{
    const cartItem = this
    const product = await Product.findById(cartItem.productId)
    console.log("product.nameProduct:",product.nameProduct)
    if (product){
        cartItem.nameProduct= product.nameProduct;
        cartItem.price= product.price * cartItem.productQuantity;
        cartItem.imageDisplay= product.imageDisplay;
    }
    next();
}catch(error){
    next("Lỗi middleware pre save in cart item .js, " + error);
}});


cartItemSchema.plugin(uniqueValidator);
module.exports=mongoose.model("CartItem",cartItemSchema);