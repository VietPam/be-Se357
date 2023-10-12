const mongoose= require("mongoose");
var uniqueValidator = require("mongoose-unique-validator")
const Schema = mongoose.Schema;

//Product
let productSchema = new Schema({
    typeId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "TypeProduct",
    },
    nameProduct: {
        type: String,
        required: true
    },
    price:{
        type: Number,
        default: 0,
    },
    sale:{
        type:Number,
        min: 0,
        max: 0,
        default:0,
    },
    image:[{
        type:String,
        default:''
    },],
    description:{
        type: String,
        default:''
    },
    createAt:{
        type: Date, 
        required: true,
        default:Date.now,
    },
    option:{
        type: Map,
        of: [String],
        default: {
            "Dung lượng": [ "8GB l 256GB", "8GB-128GB" ]
        }
    },
    details:{
        type: Map,
        of: String,
        default:{
            "Thương hiệu": "Samsung"
        }
    },
    status:{
        type:String,
        enum:['SELLING','SOLD'],
        default:'SELLING'
    }, 
    avrRating:{
        type: Number,
        default: 0,
    },
    // reviews:{
    //     default:[
    //     {},
    // ]
    // },//sau này bỏ reviews vào sau
    
    // similarProducts: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: "Product",
    // },
    // business:{
    // }// sau này bỏ id của shop
});


productSchema.plugin(uniqueValidator);
module.exports=mongoose.model("Product",productSchema);