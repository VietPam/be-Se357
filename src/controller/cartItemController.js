const { default: mongoose } = require('mongoose')
const cartSchema = require('../model/cart')
const cartItemSchema = require('../model/cartItem')

class CartItemController {
    async addCartItem(req, res, next) {
        const { userId, productId, nameProduct,price, imageDisplay, option } = req.body
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
            nameProduct: nameProduct,
            imageDisplay: imageDisplay,
            option: option,
            price:price
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
        const { userId } = req.body
        const userIdObjectId = new mongoose.Types.ObjectId(userId)
        try {
            const cartItems = await cartItemSchema.find({ userId: userIdObjectId });
            res.json(cartItems);
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
            res.status(200).json({ message: "success", cartItem });
        } catch (error) {
            console.error(error);
            res.status(500).json({ errCode: 500, errMessage: "Internal server error" });
        }
    }
    async deleteCartItem(req, res) {
        const { cartItemId } = req.body;
        try {
            const cartItem = await cartItemSchema.findByIdAndDelete(cartItemId);
            if (!cartItem) {
                return res.status(404).json({ errCode: 404, errMessage: "Cart item not found" });
            }
            res.status(200).json({ message: "Delete cartItem successfully", cartItem });
        } catch (error) {
            console.error(error);
            res.status(500).json({ errCode: 500, errMessage: "Internal server error" });
        }
    }

}
module.exports = new CartItemController;