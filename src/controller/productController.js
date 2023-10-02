const productSchema = require('../model/product')
const typeProductSchema = require('../model/typeProduct')

class ProductController{
    async getAllProducts(req,res){
        //add order filter and typeId filter
        try{
            const findProducts = await productSchema.find({}).select();
            res.send(findProducts)
        } catch (err){
            throw new Error(err);
        }
    }
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