const typeProductSchema = require('../model/typeProduct')

class TypeProductController{
    async getTypeProductPath(req,res){
        try{
            const {id} = req.params;

            const path= await this.getTypeProductPathRecursive(id,[]);

            if(!path){
                return res.status(404).json({ error: "TypeProduct not found"})
            }
            res.json(path);
        } catch(e){
            res.status(500).json({error: e.message})
        }

    }
    async getTypeProductPathRecursive( id, path){
        const typeProduct = await typeProductSchema.findById(id);
        if(!typeProduct){
            return null;
        }
        path.unshift(typeProduct._id.toString());

        if(typeProduct.parentId){
            return await this.getTypeProductPathRecursive(typeProduct.parentId, path)
        }
        return path;
    }
    async getAllProductType(req,res){//done
        try{
            const findProductType = await typeProductSchema.find({}).select();
            res.send(findProductType);
        }catch(err){
            throw new Error(err);
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