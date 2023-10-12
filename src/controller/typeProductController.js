
const typeProductSchema = require('../model/typeProduct')

class TypeProductController{
    async getAllProductType(req,res){//done
        try{
            const findProductType = await typeProductSchema.find({}).select();
            res.send(findProductType);
        }catch(err){
            throw new Error(err);
        }
    }
    async getAllChildrenIdByParentId(req,res){
        const {parentId}=req.body
        try{
            const ChildrenTypeProducts = await typeProductSchema.find({parentId:parentId})
            res.json(ChildrenTypeProducts)
        } catch(e){
            res.status(500).json({error:e.message})
        }
    }
    async getAllParentId(req,res){
        try{
            const parentTypeProducts = await typeProductSchema.find({parentId:null})
            res.json(parentTypeProducts)
        } catch(e){
            res.status(500).json({error:e.message})
        }
    }
    async addTypeProduct(req,res){
        try{
            const {nameType, parentId,note} = req.body
            const newTypeProduct = new typeProductSchema({
                nameType,parentId,note
            });
            const savedTypeProduct =await newTypeProduct.save();
            res.json(savedTypeProduct);
        } catch(e){
            res.status(500).json({error: e.message})
        }
    }
    
}
module.exports= new TypeProductController;