const { default: mongoose } = require('mongoose')
const cartSchema = require('../model/cart')
const cartItemSchema = require('../model/cartItem')

class CartItemController {
    async addCartItem(req, res, next) {
        const { userId, productId, productName,productPrice, productImg, option } = req.body
        const existingCartItem = await cartItemSchema.findOne({
            userId: new mongoose.Types.ObjectId(userId),
            productId: new mongoose.Types.ObjectId(productId),
            option: option
        })
        if (existingCartItem) {
            existingCartItem.productQuantity += 1;
            const updatedCartItem = await existingCartItem.save();
            return res.status(200).json({ message: "The quantity is incremented by 1", updatedCartItem });

        }
        const cartItem = await new cartItemSchema({
            userId: userId,
            productId: productId,
            productName: productName,
            productImg: productImg,
            option: option,
            productPrice:productPrice
        })
        try {
            const temp = await cartItem.save()
            res.status(200).json({ message: "Added successfully!", temp })
        } catch (e) {
            console.log(e);
            res.status(500).json({ errCode: 500, errMessage: "Internal server error" });
        }
    }
    // async findAllCartItem(req, res) {
    //     try {
    //         const cartItems = await cartItemSchema.find();
    //         res.json(cartItems);
    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).json({ errCode: 500, errMessage: "Internal server error" });
    //     }
    // }
    async findCartItemsByUserId(req, res) {
        const userId  = req.query.userId
        console.log(userId);
        try {
            const data = await cartItemSchema.find({ userId: userId });
            res.status(200).json({ errCode: 0, message: "Find cart by UserId successfully", data });
        } catch (error) {
            console.error(error);
            res.status(500).json({ errCode: 500, errMessage: "Internal server error" });
        }
    }

    async updateCartItem(req, res) {
        const { cartItemId, productQuantity } = req.body;
        try {

            const cartItem = await cartItemSchema.findByIdAndUpdate(
                { _id: cartItemId },
                { productQuantity: productQuantity },
                { new: true }
            );
            res.status(200).json({ message: "CartItem updated successfully", cartItem });
        } catch (error) {
            console.error(error);
            res.status(500).json({ errCode: 500, errMessage: "Internal server error" });
        }
    }
    async findCartItemById(req,res){
        const cartItemId = req.params.id
        try{
            const cartItem = await cartItemSchema.findById(cartItemId)
            if(!cartItem){
                return res.status(404).json({errCode:404,errMessage:"Cart item not found"})
            }
            res.status(200).json({message:"Found cart item successfully",cartItem})
        }catch(error){
            console.error(error);
            res.status(500).json({ errCode: 500, errMessage: "Internal server error" });
        }
    }
    async deleteOneCartItem(req, res) {
        const  cartItemId  = req.query.cartItemId;
        console.log(cartItemId);
        try {
            const cartItem = await cartItemSchema.findByIdAndDelete(cartItemId);
            if (!cartItem) {
                return res.status(404).json({ errCode: 404, errMessage: "Cart item not found" });
            }
            res.status(200).json({ message: "Deleted cartItem successfully", cartItem });
        } catch (error) {
            console.error(error);
            res.status(500).json({ errCode: 500, errMessage: "Internal server error" });
        }
    }
    async deleteAllCartItemByUserId(req, res) {    
        const userId = req.query.userId
        console.log(userId);
        try {
            const cartItems = await cartItemSchema.deleteMany({ userId: userId });
            res.status(200).json({ message: "Deleted cartItems successfully", cartItems });
        } catch (error) {
            console.error(error);
            res.status(500).json({ errCode: 500, errMessage: "Internal server error" });
        }
    }


}
module.exports = new CartItemController;