const mongoose= require("mongoose");
var uniqueValidator = require("mongoose-unique-validator")
const moment = require("moment");
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
        required: true
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
        default:'',
    },
    option:{
        type: Map,
        of: String,
        default: {
            "Size":  "S"
        }
    },
    
});
// cartItemSchema.virtual("option", {
//     ref: "Product",
//     localField: "productId",
//     foreignField: "_id",
//     justOne: true,
//     options: { select: "option" }
// });


cartItemSchema.plugin(uniqueValidator);
module.exports=mongoose.model("CartItem",cartItemSchema);