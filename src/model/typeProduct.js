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
        // nếu parentId mà khác null thì chứng tỏ nó là category con chứ còn gì lữa :))
    },
    img:{
        type:String,
        default:null,
    },
    note:{
        type: String,
        default: '',
    }
})

module.exports = mongoose.model('TypeProduct',typeProductSchema);
