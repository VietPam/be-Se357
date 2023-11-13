const mongoose = require('mongoose')
const Schema = mongoose.Schema

let addressSchema = new Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    nameAddress:{
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
    detailLocation:{
        type:String,
        reuired:true
    },
    /*
   
    Tạm thời chưa thêm type vào    
    typeAddress:{
        type:Boolean,
        required:true,
        default:true, 
        // true là nhà riêng / chung cư
        // false là cơ quan / công ty
    }
    
    */

    // isMainAddress:{              cái này bỏ cho đỡ rắc rối
    //     type:Boolean,
    //     required:true,
    //     default:false
    // },

})

module.exports = mongoose.model('Address', addressSchema)
    
