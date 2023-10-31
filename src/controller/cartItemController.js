const { default: mongoose } = require('mongoose')
const productSchema = require('../model/product')
const cartItemSchema = require('../model/cartItem')
const userSchema = require('../model/user')
class CartItemController {
    async addCartItem(req, res, next) {
        const { userId, productId, option } = req.body
        const product = await productSchema.findById(productId);
        if (!product) {
            return res.status(404).json({ errCode:-1, message: "Product not found" });
        }
        const existingCartItem = await cartItemSchema.findOne({
            userId: new mongoose.Types.ObjectId(userId),
            productId: new mongoose.Types.ObjectId(productId),
            option: option
        })
        if (existingCartItem) {
            existingCartItem.productQuantity += 1;
            const updatedCartItem = await existingCartItem.save();
            return res.status(200).json({errCode:0, message: "The quantity is incremented by 1", updatedCartItem });

        }
        const cartItem = await new cartItemSchema({
            userId: userId,
            productId: productId,
            productName: product.productName,
            productImg: product.productImg,
            option: option,
            productPrice: product.productPrice,
            productSalePrice: product.productSalePrice,
            productInventory: product.productInventory
        })
        try {
            const data = await cartItem.save()
            res.status(200).json({ errCode: 0, message: "Added cart item successfully", data });
        } catch (e) {
            console.log(e);
            res.status(500).json({ errCode: 500, errMessage: "Internal server error" });
        }
    }

    async findCartItemsByUserId(req, res) {
        const userId = req.query.userId
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
    async findCartItemById(req, res) {
        const cartItemId = req.params.id
        try {
            const cartItem = await cartItemSchema.findById(cartItemId)
            if (!cartItem) {
                return res.status(404).json({ errCode: 404, errMessage: "Cart item not found" })
            }
            res.status(200).json({ message: "Found cart item successfully", cartItem })
        } catch (error) {
            console.error(error);
            res.status(500).json({ errCode: 500, errMessage: "Internal server error" });
        }
    }
    async deleteOneCartItem(req, res) {
        const cartItemId = req.query.cartItemId;
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

    async removeCartiTemWhichHasRemovedProductID(req, res) { // chir mới clean product đã bị xóa
        try {
            const cartItems = await cartItemSchema.find({  });
            const products = await productSchema.find({  });
            //const users = await userSchema.find({  });
            /* bước 1. lọc ra các prd id hợp lệ từ productSchema(gọi là a)
            và prd id trong tất cả các cartItem(gọi là b) - lưu ý b có thể có phần tử trùng, có thể có phần tử hợp lệ
            bước 2. sau đó lấy b lọc các phần tử trùng ra, chỉ còn phần tử unique
            bước 3. sau đó filter lấy ra được một mảng chỉ chứa các phần tử từ b mà không có trong a
            mảng cuối cùng được gọi là invalid_product_Ids*/


            /* bước 1. lọc ra các prd id hợp lệ từ productSchema(gọi là a)
            và prd id trong tất cả các cartItem(gọi là b) - lưu ý b có thể có phần tử trùng, có thể có phần tử hợp lệ*/
            let valid_productIds = products.map(product => product._id.toString());
            console.log("valid_productIds: "+ valid_productIds);

            let invalid_productIds = cartItems.map(cartItem => cartItem.productId.toString());
            console.log("productIds_in_cartItems: "+ invalid_productIds); // có phần tử trùng nhau

            //bước 2. sau đó lấy b lọc các phần tử trùng ra, chỉ còn phần tử unique
            let unique_invalid_productIds = Array.from(new Set(invalid_productIds));
            console.log("unique_productIds_in_cartItems: "+ unique_invalid_productIds); // không có phần tử trùng nhau

            /*bước 3. sau đó filter lấy ra được một mảng chỉ chứa các phần tử từ b mà không có trong a
            mảng cuối cùng được gọi là invalid_product_Ids*/
            const invalid_product_Ids = unique_invalid_productIds.filter(x => !valid_productIds.includes(x));
            console.log("invalid_product_Ids: "+ invalid_product_Ids);
            try{
                if(invalid_product_Ids.length===0){
                    return res.status(404).json({ errCode: 404, errMessage: "No cartItem has been removed" })
                }
            invalid_product_Ids.forEach(async (productId1) => {
                
                const deleted= await cartItemSchema.deleteMany({ productId: productId1 })
                console.log(" id: "+ deleted)
                res.status(200).json({ message: "Deleted cartItems successfully", deleted })
            })} catch (error) {
                console.error(error);
                res.status(500).json({ errCode: 500, errMessage: "Internal server error" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ errCode: 500, errMessage: "Internal server error" });
        }
    }

}
module.exports = new CartItemController;