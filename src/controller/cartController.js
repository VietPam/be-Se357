const cartSchema = require('../model/cart')

class CartController{
    async getCartByUserId(req,res){
        const {userId}=req.params.userId
        try{
            const cart = await cartSchema.find({userId:userId})
            res.json(cart)
        } catch (err){
            throw new Error(err);
        }
    }
    async createCart(req,res,next){
        //check for existing cart by userId
        //if cart exist, return cart
        //else create new cart
        const findCart= cartSchema.find({userId:req.body.userId})
        if(findCart){
            return res.status(400).json({success:false,message:"Cart already exist"})
        }
        const cart =await new cartSchema({
            userId:req.body.userId,
        })
        try{
            const temp = await cart.save()
            res.json(temp)
        } catch(e){ console.log(e);}
    }
    
    
}
module.exports= new CartController;