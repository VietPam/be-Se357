const cartSchema = require('../model/cart')
const cartItemSchema = require('../model/cartItem')

class CartItemController{
    async createCartItem(req,res,next){
        const {userId,productId,nameProduct,imageDisplay}=req.body
        console.log(1)
        const cartItem = await new cartItemSchema({
            userId:userId,
            productId:productId,
            nameProduct:nameProduct,
            imageDisplay:imageDisplay
        })
        try{
            const temp = await cartItem.save()
            res.json(temp)
        } catch(e){ console.log(e);}
        
    }
    
    
}
module.exports= new CartItemController;