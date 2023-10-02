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
        requiered: true
    },
    price:{
        type: Number,
        default: 0,
    },
    image:{
        type:String,
        default:''
    },
    description:{
        type: String,
        default:''
    },
    createAt:{
        type: Date, 
        require: true,
        default:Date.now,
    },
    size:{
        type:String,
        default:'',
    },
    status:{
        type:String,
        enum:['SELLING','SOLD'],
        default:'SELLING'
    }

});


productSchema.plugin(uniqueValidator);
module.exports=mongoose.model("Product",productSchema);