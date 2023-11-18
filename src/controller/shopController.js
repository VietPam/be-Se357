const { default: mongoose } = require('mongoose')
const shopSchema = require('../model/shop')
class ShopController {
    async getAll(req,res){
        try {
            const data = await shopSchema.find();
            res.status(200).json({ message: "Find shop successfully", data });
        } catch (err) {
            res.status(500).json({ message: "Error from the server" });
        }
    }


    

}
module.exports = new ShopController;