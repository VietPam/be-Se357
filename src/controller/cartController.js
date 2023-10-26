const cartSchema = require('../model/cart')

class CartController{
    async getCartByUserId(req,res){
        const {userId}=req.body
        try{
            const cart = await cartSchema.findOne({userId:userId})
            res.json({success:true,cart})
        } catch (err){
            throw new Error(err);
        }
    }
    async createCart(req,res,next){         //DONE
        //check for existing cart by userId
        //if cart exist, return cart
        //else create new cart
        const {userId}=req.body
        console.log(userId)
        const existingCart= await cartSchema.findOne({userId:userId})
        console.log(existingCart)
        if(existingCart){
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