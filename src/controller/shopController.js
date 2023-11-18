const { default: mongoose } = require('mongoose')
const shopSchema = require('../model/shop')
class ShopDTO {
    constructor(nameShop, bossId) {
        this.nameShop = nameShop;
        this.bossId = bossId;
    }
}
class ShopController {
    async getAll(req,res){
        try {
            const data = await shopSchema.find();
            res.status(200).json({ message: "Find shop successfully", data });
        } catch (err) {
            res.status(500).json({ message: "Error from the server" });
        }
    }
    async createNew(req,res){
        try {
            if (req.body.nameShop==null){
                return res.status(500).json({message: "empty params"});
            }
            const duplicateShop = await shopSchema.findOne({nameShop:req.body.nameShop})
            if (duplicateShop){
                return res.status(400).json({ message: "Shop already exist" });
            }
            const shop = await new shopSchema({
                nameShop: req.body.nameShop,
                bossId: req.body.bossId,
            })
            const tmp = await shop.save();
            const data= new ShopDTO(tmp.nameShop, tmp.bossId)
            res.status(200).json({ message: "Create shop successfully", data });
        } catch (err) {
            res.status(500).json({ message: "Error from the server" });
        }
    }



    

}
module.exports = new ShopController;