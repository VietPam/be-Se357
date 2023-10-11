const mongoose = require('mongoose')
const typeProductSchema = new mongoose.Schema({
    nameType:{
        type: String,
        required: true,
        unique: true,    
    },
    parentId:{
        type:String,
        default:null,
    },
    childrenId:[{
        type:String,
        default:null,
    }],
    note:{
        type: String,
        default: '',
    }
})

module.exports = mongoose.model('TypeProduct',typeProductSchema);
