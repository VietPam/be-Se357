const { default: mongoose } = require('mongoose')
const cartSchema = require('../model/cart')
const cartItemSchema = require('../model/cartItem')

class CartItemController{
    async createCartItem(req,res,next){
        const {userId,productId,nameProduct,imageDisplay,option}=req.body
        console.log(1)
        const cartItem = await new cartItemSchema({
            userId:userId,
            productId:productId,
            nameProduct:nameProduct,
            imageDisplay:imageDisplay,
            option:option,
        })
        try{
            const temp = await cartItem.save()
            res.json(temp)
        } catch(e){ console.log(e);}
    }
    async findAllCartItem(req, res) {
        try {
            const cartItems = await cartItemSchema.find();
            res.json(cartItems);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }   
    async findCartItemsByUserId(req,res){
        const {userId}=req.body
        const userIdObjectId = mongoose.Types.ObjectId(userId)
        try {
            const cartItems = await cartItemSchema.find({userId:userIdObjectId});
            res.json(cartItems);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
    
    
}
module.exports= new CartItemController;