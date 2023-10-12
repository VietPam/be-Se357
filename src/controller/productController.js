const productSchema = require('../model/product')

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
    
    async createProduct(req,res,next){
        const product =await new productSchema({
            typeId:req.body.typeId,
            nameProduct: req.body.nameProduct,
            price: req.body.price,
            sale: req.body.sale,
            image: req.body.image,
            description:req.body.description,
            status:req.body.status,
            option: req.body.option,
            details: req.body.details,
        })

        try{
            const temp = await product.save()
            res.json(temp)
        } catch(e){ console.log(e);}
    }
    
}
module.exports= new ProductController;