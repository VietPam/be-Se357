//implement controller for order
const orderSchema = require('../model/order')
const axios = require('axios');

async function calculateTotalOrder(cartItemsId) {
    console.log("cartItemsId: " + cartItemsId)
    //tính tổng tiền của order
    let total = 0
    // tạo một biến lưu các thông tin chi tiết của cartitemId gồm có price và quantity trong đó, sử dụng post để get thông tin về
    // sau đó tính tổng tiền
    //dùng axios để gọi POST từ localhost:8000/cartitem/

    try {
        for (const item of cartItemsId) {
            const temp = await getCartItemById(item);
            total += temp.price * temp.productQuantity;
        }
        console.log("Tổng tiền:" + total);
        return total; // Trả về giá trị tổng tiền
    } catch (error) {
        console.error(error);
        return 0; // Trả về 0 hoặc một giá trị khác nếu có lỗi
    }
}
async function getCartItemById(cartItemId) {
    const tmp = { cartItemId: cartItemId }
    try {
        console.log("getCartItemById, cartItemId: " + cartItemId);
        try {
        const response = await axios.post(`localhost:8000/cartItem/findCartItemById`,tmp); }
        catch(e) {
            console.log("lỗi")
        }
        // console.log("response.data: " + response.data)
        // return response.data;
        return 1
    } catch (error) {
        console.error(error);
    }
}
class orderController {

    //bấm thanh toán thì tạo order
    async createOrder(req, res) {//chưa xong
        const { cartItemsId, addressId } = req.body
        const order = await new orderSchema({
            cartItemsId: cartItemsId,
            address: addressId,
            // total: 0
        })
        console.log("Vẫn ổn, "+ order)
        try {
            const temp = await order.save()
            // sau khi lưu thành công thì xóa các cartitems khỏi giỏ hàng
            //xóa các cartitem
            // cartItemsId.forEach(async (item) => {
            //     await cartItemSchema.findByIdAndDelete(item._id)
            // })
            res.status(200).json({ message: "Add new order successfully", temp })
        } catch (e) {
            res.status(500).json({ errCode: 500, errMessage: "Internal server error vãi lz" })
        }
    }
    //
    async getAllOrderByUserId(req, res) {
        const { userId } = req.body

    }

    
   
}
module.exports = new orderController;
