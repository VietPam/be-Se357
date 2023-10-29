//implement controller for order
const orderSchema = require('../model/order')
function calculateTotalOrder(cartItemsId){
    console.log("cartItemsId: "+cartItemsId)
    //tính tổng tiền của order
    let total = 0
    // tạo một biến lưu các thông tin chi tiết của cartitemId gồm có price và quantity trong đó, sử dụng post để get thông tin về
    // sau đó tính tổng tiền
    //dùng axios để gọi POST từ localhost:8000/cartitem/
    

    cartItemsId.forEach((item)=>{
        console.log("price: "+item.price)
        console.log("quantity:" + item.productQuantity)
        total += item.price*item.productQuantity
    })
    console.log("Tổng tiền:" + total)
}
class orderController{

    //bấm thanh toán thì tạo order
    async createOrder(req,res){//chưa xong
        const {cartItemsId,addressId,paymentMethod} = req.body
        const order = await new orderSchema({
            cartItemsId:cartItemsId,
            addressId:addressId,
            paymentMethod:paymentMethod,
            total:calculateTotalOrder(cartItemsId)
        })
        try{
            const temp = await order.save()
            // sau khi lưu thành công thì xóa các cartitems khỏi giỏ hàng
            //xóa các cartitem
            cartItemsId.forEach(async (item)=>{
                await cartItemSchema.findByIdAndDelete(item._id)
            })
            res.status(200).json({message:"Add new order successfully",temp})
        }catch(e){
            res.status(500).json({errCode:500,errMessage:"Internal server error"})
        }
    }
    //
    async getAllOrderByUserId(req,res){
        const {userId} = req.body
        
    }
}
module.exports = new orderController;
