//implement controller for order
const orderSchema = require('../model/order')
class orderController{

    //bấm thanh toán thì tạo order
    async createOrder(req,res){//chưa xong
        const {userId,cartItemsId,address,paymenMethod,status,total} = req.body
        const order = new orderSchema({
            userId,cartItemsId,address,paymenMethod,status,total
        })
        await order.save()
        res.status(200).json({order})
    }
    //
    async getAllOrderByUserId(req,res){
        const {userId} = req.body
        
    }
}
module.exports = new orderController;
