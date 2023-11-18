const mongoose = require('mongoose')
const cartItemSchema = require('../model/cartItem');
const Schema = mongoose.Schema
let orderSchema= new Schema({
    cartItemsId:[{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "CartItem"
    }],
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
        default:1,
    },
    time:{
        type:Date,
        required:true,
        default:Date.now
    },
})


orderSchema.pre('save', async function (next) {
    try {
        // Chuyển đổi ObjectId thành chuỗi string
        const cartItemIds = this.cartItemsId.map(ObjectId => ObjectId.toString());

        // Tính toán lại giá trị total dựa trên giá trị của các cart items
        const cartItems = await cartItemSchema.find({ _id: { $in: cartItemIds } }).lean();

        let total = 0;

        // Tính tổng giá trị của các cart items
        for (const cartItem of cartItems) {
            total += cartItem.productAmount;
        }

        // Gán giá trị total vào thuộc tính của order
        this.total = total;
        next();
    } catch (error) {
        console.log("Lỗi middleware pre-save trong Order schema: " + error);
    }
});

module.exports = mongoose.model('Order',orderSchema)