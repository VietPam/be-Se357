const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
    },
    nameAccount:{
        type: String,
        default: '',
    },
    password:{
        type: String,
        required: true,
    },
    phone:{
        type:String,
        default:''
    },
    role:{
        type: String,
        required: true,
        enum:['ADMIN','CUSTOMER'],
        default:'CUSTOMER',
    },
    cart:{
        type: [String],//productId
        default:[]
    },
    createAt:{
        type:Date,
        required:true,
        default:Date.now
    }
})
module.exports=mongoose.model('User',userSchema);