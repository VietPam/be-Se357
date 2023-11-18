//implement controller for order
const orderSchema = require('../model/order')
const axios = require('axios');
const cartItemSchema = require('../model/cartItem')

class orderController {

    //bấm thanh toán thì tạo order
    async createOrder(req, res) {//chưa xong
        if(req.body.cartItemsId==null){
            res.status(500).json({ errCode: 500, errMessage: "Internal server error" })
        }
        const { cartItemsId, addressId } = req.body
        const order = await new orderSchema({
            cartItemsId: cartItemsId,
            address: addressId,
        })
        try {
            const temp = await order.save()
            // sau khi lưu thành công thì xóa các cartitems khỏi giỏ hàng
            //xóa các cartitem
            // cartItemsId.forEach(async (item) => {
            //     await cartItemSchema.findByIdAndDelete(item._id)
            // })
            res.status(200).json({ message: "Add new order successfully", temp })
        } catch (e) {
            res.status(500).json({ errCode: 500, errMessage: "Internal server error" })
        }
    }
    //
    async getAllOrderByUserId(req, res) {
        const userId = req.params.id;
        try{
            const orders = await orderSchema.find({userId:userId})
            res.status(200).json(orders);
        }catch(e){
            res.status(500).json({ errCode: 500, errMessage: "Internal server error" })
        }

    }
    async getAllOrderByShopId(req, res) {
        const shopId = req.params.id;
        try{
            const orders = await orderSchema.find({shopId:shopId})
            res.status(200).json(orders);
        }catch(e){
            res.status(500).json({ errCode: 500, errMessage: "Internal server error" })
        }
    }


}
module.exports = new orderController;
