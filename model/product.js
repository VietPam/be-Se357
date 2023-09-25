const mongoose= require("mongoose");
var uniqueValidator = require("mongoose-unique-validator")
const Schema = mongoose.Schema;

//Category
let Category_Schema = new Schema({
    name:{
        type: String,
        required: true,
        unique: true,
    },
});

//Product
let product_Schema = new Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Category",
    },
    name: {
        type: String,
        requiered: true,
        unique: true,
    },
    originPrice:{
        type: Number,
        required: true,
    },
    costPrice:{
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        default: 0,
    },
    salePrice:{
        type: Number,
        required: true,
    },
    imageDisplay:{
        type:String,
    },
    Option: [
        {
            size: {
                type: String,
                required: true,
            },
            quantity:{
                type: Number,
                required: true,
            },
        }
    ],
});

Category_Schema.plugin(uniqueValidator);
product_Schema.plugin(uniqueValidator);

exports.Category = mongoose.model("Category",Category_Schema)
exports.Product=mongoose.model("Product",product_Schema);