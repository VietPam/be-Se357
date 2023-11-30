//implement controller for order
const orderSchema = require('../model/order')
class orderController {

    async createOrder(req, res) {
        if(req.body.cartItemId==null){
            res.status(500).json({ errCode: 500, errMessage: "Internal server error" })
        }
        const { cartItemId, addressId, userId, shopId } = req.body
        const order = await new orderSchema({
            cartItemId: cartItemId,
            address: addressId,
            userId: userId,
            shopId: shopId,
        })
        try {
            const data = await order.save()
            res.status(200).json({ message: "Create new order successfully", data })
        } catch (e) {
            res.status(500).json({ errCode: 500, errMessage: "Internal server error" })
        }
    }
    //
    async getAllOrderByUserId(req, res) {
        const userId = req.query.id;
        try{
            const orders = await orderSchema.find({userId:userId})
            res.status(200).json(orders);
        }catch(e){
            res.status(500).json({ errCode: 500, errMessage: "Internal server error" })
        }

    }
    async getAllOrderByShopId(req, res) {
        const shopId = req.query.id;
        try{
            const orders = await orderSchema.find({shopId:shopId})
            res.status(200).json(orders);
        }catch(e){
            res.status(500).json({ errCode: 500, errMessage: "Internal server error" })
        }
    }


}
module.exports = new orderController;
