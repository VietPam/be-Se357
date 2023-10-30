const cartSchema = require('../model/cart')
const { default: mongoose } = require('mongoose')

const cartItemSchema = require('../model/cartItem')
class CartController {
    async getCartByUserId(req, res) {
        const  userId  = req.params.id
        try {
            const userIdObjectId = new mongoose.Types.ObjectId(userId)

            const cart = await cartSchema.findOne({ userId: userIdObjectId })
            //if already have cart, return cart
            if (cart) {
                return res.status(200).json({ success: true, cart })
            }
            else {//not have cart
                //create new cart
                const cart = await new cartSchema({
                    userId: userId,
                })
                //return
                const temp = await cart.save()
                res.status(200).json({  message: "Created new cart!", temp })
            }
        } catch (err) {
            throw new Error(err);
        }
    }
    async createCart(req, res, next) {         //DONE
        //check for existing cart by userId
        //if cart exist, return cart
        //else create new cart
        const { userId } = req.body
        const existingCart = await cartSchema.findOne({ userId: userId })
        if (existingCart) {
            return res.status(400).json({ success: false, message: "Cart already exist" })
        }
        const cart = await new cartSchema({
            userId: req.body.userId,
        })
        try {
            const temp = await cart.save()
            res.json(temp)
        } catch (e) { console.log(e); }
    }



}
module.exports = new CartController;