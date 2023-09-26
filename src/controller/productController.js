const productSchema = require('../model/product')
const typeProductSchema = require('../model/typeProduct')

class ProductController{
    async getAllProductType(req,res){//done
        try{
            const findProductType = await typeProductSchema.find({}).select();
            res.send(findProductType);
        }catch(err){
            throw new Error(err);
        }
    }

}
module.exports= new ProductController;