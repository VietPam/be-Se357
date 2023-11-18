const mongoose = require('mongoose')
const Schema = mongoose.Schema

let shopSchema = new Schema({
    nameShop:{
        type: String,
        required:true,
    },
    bossId:{
        type: mongoose.Schema.Types.ObjectId,
        //required: true,
        ref: "User"
        //default: new mongoose.Schema.Types.ObjectId( id cua admin)
    },
    address:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Address",
    },
    isDeleted:{
        type: Boolean,
        required: true,
        default: false,
    }
    //ở bên product thì mặc định IdShop là của admin
    // tạo mới một shop admin của nền tảng TMĐT rồi gán vào trước
    // để có trang admin

})
module.exports = mongoose.model('Shop',shopSchema);
