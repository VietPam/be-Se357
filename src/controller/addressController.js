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
        try {
            const temp = await address.save()
            res.status(200).json({ message: "Add new Adress successfully", temp })
        } catch (e) {
            res.status(500).json({ errCode: 500, errMessage: "Internal server error" });
        }
    }
    async updateAddress (req, res) {
        const { addressId, nameAdress, city, district, street, detailLocation } = req.body;

        try {
            // Find the address by ID
            const address = await addressSchema.findByIdAndUpdate(
                { _id: addressId },
                {
                    nameAdress: nameAdress,
                    city: city,
                    district: district,
                    street: street,
                    detailLocation: detailLocation
                },
                { new: true }
            )
            
            // Return the updated address object
            res.status(200).json({ message: "Address updated successfully", address: updatedAddress });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
    async getAllAddressByUserId(req, res) {
        const id = req.params.id;
        try {
            const address = await addressSchema.find({ userId: id });
            res.json(address);
        } catch (error) {
            console.error(error);   
            res.status(500).json({ errCode: 500, errMessage: "Internal server error" });
        }
    }
    async deleteAddress(req, res) {
        const { addressId } = req.body;
        try {
            const address = await addressSchema.findByIdAndDelete(addressId);
            if (!address) {
                return res.status(404).json({ errCode: 404, errMessage: "Address not found" });
            }
            res.status(200).json({ message: "Deleted address successfully", address });
        } catch (error) {
            console.error(error);
            res.status(500).json({ errCode: 500, errMessage: "Internal server error" });
        }
    }
}
module.exports = new addressController;