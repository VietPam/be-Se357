
const typeProductSchema = require('../model/typeProduct')

class TypeProductController{
    async getAllProductType(req,res){//done
        try{
            const data = await typeProductSchema.find({}).select();
            res.status(200).json({errCode:0, errMessage:"Get all product type successfully!",data});
        }catch(err){
            res.status(500).json({errCode:-1, errMessage:"Error from server"})
        }
    }
    async getAllChildrenIdByParentId(req,res){
        const parentId=req.query.parentId
        try{
            const data = await typeProductSchema.find({parentId:parentId})
            res.status(200).json({errCode:0, errMessage:"Get product type by parentId successfully!",data});
        } catch(e){
            res.status(500).json({errCode:-1, errMessage:"Error from server"})
        }
    }
    async getAllParentId(req,res){
        try{
            const data = await typeProductSchema.find({parentId:null})
            res.status(200).json({errCode:0, errMessage:"Get parentId product type successfully!",data});
        } catch(e){
            res.status(500).json({errCode:-1, errMessage:"Error from server"})
        }
    }
    async addTypeProduct(req,res){
        try{
            const {nameType, parentId,note} = req.body
            const newTypeProduct = new typeProductSchema({
                nameType,parentId,note
            });
            const data =await newTypeProduct.save();
            res.status(200).json({errCode:0, errMessage:"Add product type successfully!",data});
        } catch(e){
            res.status(500).json({errCode:-1, errMessage:"Error from server"})
        }
    }
    
}
module.exports= new TypeProductController;