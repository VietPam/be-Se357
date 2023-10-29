const addressSchema = require('../model/address')
class addressController {
    async addAddress(req, res) {
        const { userId, nameAdress, city, district, street, detailLocation } = req.body

        const address = await new addressSchema({
            userId: userId,
            nameAdress: nameAdress,
            city: city,
            district: district,
            street: street,
            detailLocation: detailLocation
        })
        try{
            const temp = await address.save()
            res.status(200).json({ message: "Add new Adress successfully", temp })
        }catch(e){
            res.status(500).json({ errCode: 500, errMessage: "Internal server error" });
        }
    }

}
module.exports = new addressController;