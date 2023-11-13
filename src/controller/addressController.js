const addressSchema = require('../model/address')
class addressController {
    async addAddress(req, res) {
        const { userId, nameAddress, city, district, street, detailLocation } = req.body
        if (!userId || !nameAddress || !city || !district || !street || !detailLocation) {
            console.log("Nhập thiếu")
            return res.status(400).json({ errCode: 1, errMessage: "Missing required parameter" });
        }
        const address = await new addressSchema({
            userId: userId,
            nameAddress: nameAddress,
            city: city,
            district: district,
            street: street,
            detailLocation: detailLocation
        })
        try {
            const data = await address.save()
            res.status(200).json({ code:0, message: "Add new Address successfully", data })
        } catch (e) {
            res.status(500).json({ errCode: 1, errMessage: "Internal server error" });
        }
    }
    async updateAddress (req, res) {
        const { addressId, nameAddress, city, district, street, detailLocation } = req.body;

        try {
            // Find the address by ID
            const address = await addressSchema.findByIdAndUpdate(
                { _id: addressId },
                {
                    nameAddress: nameAddress,
                    city: city,
                    district: district,
                    street: street,
                    detailLocation: detailLocation
                },
                { new: true }
            )
            if(!address) {
                return res.status(404).json({ errCode: 404, errMessage: "Address not found" });
            }
            // Return the updated address object
            res.status(200).json({ message: "Address updated successfully", data: address });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
    async getAllAddressByUserId(req, res) {
        const id = req.query.userId;
        try {
            const address = await addressSchema.find({ userId: id });
            res.status(200).json({code: 0,message:"Get addresses by userId successful.", data: address});
        } catch (error) {
            console.error(error);   
            res.status(500).json({ errCode: -1, errMessage: "Internal server error" });
        }
    }
    async deleteAddress(req, res) {
        const addressId  = req.query.addressId;
        console.log(addressId);
        try {
            const data = await addressSchema.findByIdAndDelete(addressId);
            if (!data) {
                return res.status(404).json({ errCode: 404, errMessage: "Address not found" });
            }
            res.status(200).json({code:0, message: "Deleted address successfully", data });
        } catch (error) {
            console.error(error);
            res.status(500).json({ errCode: 500, errMessage: "Internal server error" });
        }
    }
}
module.exports = new addressController;