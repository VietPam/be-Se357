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
                typeId: "65572eec3632afc337bd1b04",
                productName:req.body.title,
                productPrice:parseInt(req.body.price_discount),
                discount:parseInt(req.body.discount),
                productSalePrice:req.body.productSalePrice,
                productImgList:req.body.imgs,
                sold:5000,
                productImg:req.body.img,
                description:req.body.highlight,
                option:req.body.option,
                details:req.body.details,
                productStatus:req.body.productStatus,
                avrRating:4.5,
                productInventory:200,
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
    async getProductInHomePage(req, res) {
        try {
            const data = await productSchema.find({}).select('productName discount productPrice productSalePrice productImg sold avrRating').limit(30);
            res.status(200).json({ errCode: 0, message: "Find Product successfully", data });
        } catch (err) {
            res.status(500).json({ errCode: -1, message: "Error from the server" });
        }
    }
}

module.exports = new ProductController;