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
            const address = await addressSchema.findById(addressId);
            // Update the address fields
            address.nameAdress = nameAdress;
            address.city = city;
            address.district = district;
            address.street = street;
            address.detailLocation = detailLocation;

            // Save the updated address to the database
            const updatedAddress = await address.save();

            // Return the updated address object
            res.status(200).json({ message: "Address updated successfully", address: updatedAddress });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

}
module.exports = new addressController;