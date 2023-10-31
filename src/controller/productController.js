const productSchema = require('../model/product')

class ProductController{
    async getAllProducts(req,res){
        //add order filter and typeId filter
        try{
            const data = await productSchema.find({}).select();
            res.status(200).json({errCode: 0, message:"Find Product successfully", data});
        } catch (err){
            res.status(500).json({errCode: -1, message:"Error from the server"});

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
            const data = await product.save()
            res.status(200).json({errCode: 0, message:"Find Product successfully", data});
        } catch(e){ 
            res.status(500).json({errCode: -1, message:"Error from the server"});
        }
    }
    
    async findProductByProductId(req,res){
        const id = req.query.productId
        try{
            const data = await productSchema.findById(id);
            res.status(200).json({errCode: 0, message:"Find Product successfully", data});
        } catch (err){
            res.status(500).json({errCode: -1, message:"Error from the server"});
        }
    }
}
module.exports= new ProductController;