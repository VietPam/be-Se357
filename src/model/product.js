const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Product
let productSchema = new Schema({
    typeId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "TypeProduct",
        default: "65410eef6ade14bab2b2b897"
    },
    productName: {
        type: String,
        required: true
    },
    productPrice: {
        type: Number,
        default: 999999,
    },
    discount: {
        type: Number,
        min: 0,
        max: 100,
        default: 10,
    },
    productSalePrice: {
        type: Number,
        default: 0,
    },
    sold: {
        type: Number,
        default: 5000,
    },
    productImgList: {
        type: [String],
        default: [
            "https://product.hstatic.net/1000284478/product/0000_black_m9160c_1_da1c1e61bbf44183940afe225b3f5f75_large.jpg",
            "https://product.hstatic.net/1000284478/product/0000_black_m9160c_1_da1c1e61bbf44183940afe225b3f5f75_large.jpg",
            "https://product.hstatic.net/1000284478/product/0000_black_m9160c_1_da1c1e61bbf44183940afe225b3f5f75_large.jpg",
            "https://product.hstatic.net/1000284478/product/0000_black_m9160c_1_da1c1e61bbf44183940afe225b3f5f75_large.jpg"
        ],
    },
    productImg: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    createAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
    option: [{
        type: Map,
        of: [String],
        default: {
            size: ["S", "L", "XL"]
        }
    }],
    details: {
        type: Map,
        of: String,
        default: {
            brand: "Samsung",
            isWarranty: "Có",
            warrantyLast: "12 tháng",
        }
    },
    productStatus: {
        type: String,
        enum: ['SELLING', 'SOLD', 'DRAFT'],
        default: 'SELLING'
    },
    avrRating: {
        type: Number,
        default: 4.5,
    },
    productInventory: {
        type: Number,
        default: 10
    }

});
productSchema.pre('save', function (next) {
    this.productSalePrice = (100 - this.discount) / 100 * this.productPrice;
    if (this.productImgList.length > 0) {
        this.productImg = this.productImgList[0];
    }
    next();
});

module.exports = mongoose.model("Product", productSchema);