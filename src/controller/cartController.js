const cartSchema = require('../model/cart')

class ProductController{
    async getCartByUserId(req,res){
        const {userId}=req.params.id
        try{
            const cart = await cartSchema.find({userId:userId})
            res.json(cart)
        } catch (err){
            throw new Error(err);
        }
    }
    
    
}
module.exports= new ProductController;