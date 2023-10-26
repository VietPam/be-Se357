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
        const userIdObjectId =new mongoose.Types.ObjectId(userId)
        try {
            const cartItems = await cartItemSchema.find({userId:userIdObjectId});
            res.json(cartItems);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
    
    // async updateCartItem(req,res){
    //     const {cartItemId,productQuantity}=req.body
    //     const cartItemObjectId =new mongoose.Types.ObjectId(cartItemId)
    //     try {
    //         const cartItem = await cartItemSchema.findOne({_id:cartItemObjectId});
    //         cartItem.productQuantity=productQuantity
    //         const temp = await cartItem.save()
    //         res.status(200).json({message:"success",temp})
    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).json({ message: "Internal server error" });
    //     }
    // }
    async updateCartItem(req, res) {
        const { cartItemId, productQuantity } = req.body;
        const cartItemObjectId = new mongoose.Types.ObjectId(cartItemId);
        try {
          const cartItem = await cartItemSchema.findOneAndUpdate(
            { _id: cartItemObjectId },
            { productQuantity: productQuantity },
            { new: true }
          );
          res.status(200).json({ message: "success", cartItem });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: "Internal server error" });
        }
      }
    async deleteCartItem(req, res) {
        const { cartItemId } = req.body;
        try {
            const cartItem = await cartItemSchema.findByIdAndDelete(cartItemId);

            if (!cartItem) {
                return res.status(404).json({ errCode:404,errMessage: "Cart item not found" });
            }

            res.status(200).json({ message: "success", cartItem });
        } catch (error) {
            console.error(error);
            res.status(500).json({errCode:500, errMessage: "Internal server error" });
        }
    }
    
}
module.exports= new CartItemController;