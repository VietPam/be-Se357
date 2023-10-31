const productSchema = require('../model/product')

class ProductController {
    async getAllProducts(req, res) {
        //add order filter and typeId filter
        try {
            const data = await productSchema.find({}).select();
            res.status(200).json({ errCode: 0, message: "Find Product successfully", data });
        } catch (err) {
            res.status(500).json({ errCode: -1, message: "Error from the server" });

        }
    }

    async createProduct(req, res, next) {
        const duplicateProduct = await productSchema.findOne({ productName: req.body.productName })
        try {
            if (duplicateProduct) {
                return res.status(400).json({ errCode: -1, message: "Product already exist" });
            }
        } catch (err) {
            res.status(500).json({ errCode: -1, message: "Error from the server" });
        }
        try {
            const product = await new productSchema({
                typeId: req.body.typeId,
                productName:req.body.productName,
                productPrice:req.body.productPrice,
                discount:req.body.discount,
                productSalePrice:req.body.productSalePrice,
                productImgList:req.body.productImgList,
                sold:req.body.sold,
                productImg:req.body.productImg,
                description:req.body.description,
                option:req.body.option,
                details:req.body.details,
                productStatus:req.body.productStatus,
                avrRating:req.body.avrRating,
                productInventory:req.body.productInventory,
            })


            const data = await product.save()
            res.status(200).json({ errCode: 0, message: "Add product successfully", data });
        } catch (e) {
            console.log(e)
            res.status(500).json({ errCode: -1, message: "Error from the server" });
        }
    }

    async findProductByProductId(req, res) {
        const id = req.query.productId
        try {
            const data = await productSchema.findById(id);
            res.status(200).json({ errCode: 0, message: "Find Product successfully", data });
        } catch (err) {
            console.log(err)
            res.status(500).json({ errCode: -1, message: "Error from the server" });
        }
    }
}

module.exports = new ProductController;