const mongoose= require("mongoose");
var uniqueValidator = require("mongoose-unique-validator")
const moment = require("moment");
const Schema = mongoose.Schema;
// hàm này để tính ngày giao hàng mặc định(2 ngày kể từ ngày hôm nay)
function getDefaultProductDeliveryDate() {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 2); // Thêm 2 ngày
    const formattedDeliveryDate = moment(currentDate).format("dddd, DD/M");
    return ` ${formattedDeliveryDate}`;
}
let cartItemSchema = new Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"User",
    },
    cartId:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"Cart",
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
        default:getDefaultProductDeliveryDate
    },
    imageDisplay: {
        type: String,
        default:'',
    },
    
});
cartItemSchema.virtual("option", {
    ref: "Product",
    localField: "productId",
    foreignField: "_id",
    justOne: true,
    options: { select: "option" }
});


cartItemSchema.plugin(uniqueValidator);
module.exports=mongoose.model("CartItem",cartItemSchema);