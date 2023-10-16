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
    isSaled:{
        type: Boolean,
        required: true,
        default: false,
    },
    sale:{
        type:Number,
        min: 0,
        max: 100,
        default:0,
    },
    images:[{
        type:String,
        default:''
        },
    ],
    imageDisplay:{
        type: String,
        default:''
    },
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
            "Size": [ "S", "L","XL" ]
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
        enum:['SELLING','SOLD','DRAFT'],
        default:'SELLING'
    }, 
    avrRating:{
        type: Number,
        default: 0,
    },
    productInventory:{
        type: Number,
        default:1
    }
    // reviews:{
    //     default:[
    //     {},
    // ]
    // },//sau này bỏ reviews vào sau
    
});


productSchema.plugin(uniqueValidator);
module.exports=mongoose.model("Product",productSchema);