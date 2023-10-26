const mongoose = require('mongoose')
const Schema = mongoose.Schema

let addressSchema = new Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    name:{
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    location:{
        type:String,
        reuired:true
    },
    typeAddress:{
        type:Boolean,
        required:true,
        default:true, 
        // true là nhà riêng / chung cư
        // false là cơ quan / công ty
    }

    // isMainAddress:{              cái này bỏ cho đỡ rắc rối
    //     type:Boolean,
    //     required:true,
    //     default:false
    // },

})

module.exports = mongoose.model('Address', addressSchema)
    
