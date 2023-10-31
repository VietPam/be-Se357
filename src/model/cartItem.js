const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator")
const moment = require("moment");
const Product = require("./product");
const Schema = mongoose.Schema;

let cartItemSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "User",
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product"
    },
    productName: {
        type: String,
    },
    productQuantity: {
        type: Number,
        default: 1
    },
    productDelivery: { // ngày giao hàng
        type: String,
        required: true,
        default: function () {
            const today = new Date();
            today.setDate(today.getDate() + 2);
            const formattedDate = today.toLocaleDateString('vi-VN', { weekday: 'long', day: '2-digit', month: '2-digit' });
            return `Giao vào ${formattedDate}`;
        }
    },
    productImg: {
        type: String,
    },
    productPrice: {
        type: Number,
        required: true,
        default: 0,
    },
    option: {
        type: Map,
        of: String,
        default: {
            "Size": "S"
        }
    },
    productInventory: {
        type: Number,
    }

});
//truoc khi luu thi ghep' productName + image display 
cartItemSchema.pre('save', async function (next) {
    try {
        const cartItem = this
        const product = await Product.findById(cartItem.productId)
        console.log("product.productName:", product.productName)
        if (product) {
            cartItem.productName = product.productName;
            cartItem.productPrice = product.productPrice * cartItem.productQuantity;
            cartItem.productImg = product.productImg;
            cartItem.productInventory = product.productInventory;
        }
        next();
    } catch (error) {
        next("Lỗi middleware pre save in cart item .js, " + error);
    }
});

/**
 * pre update => check lai productPrice

 */
cartItemSchema.pre('save', async function (next) {
    try {
        const cartItem = this;

        // Tìm tất cả các productId trong collection Products
        const products = await Product.find({});
        const productIdList = products.map(product => product._id.toString());

        // Kiểm tra xem productId của cartItem hiện tại có tồn tại trong productIdList hay không
        if (!productIdList.includes(cartItem.productId.toString())) {
            // Nếu không, xóa cartItem hiện tại
            await cartItem.remove();
        } else {
            // Nếu có, tiếp tục với các thao tác khác
            const product = await Product.findById(cartItem.productId);
            if (product) {
                cartItem.productName = product.productName;
                cartItem.productPrice = product.productPrice * cartItem.productQuantity;
                cartItem.productImg = product.productImg;
                cartItem.productInventory = product.productInventory;
            }
        }

        next();
    } catch (error) {
        next("Lỗi middleware pre save in cart item .js, " + error);
    }
});

cartItemSchema.plugin(uniqueValidator);
module.exports = mongoose.model("CartItem", cartItemSchema);