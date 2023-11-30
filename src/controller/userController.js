const userModel = require('../model/user')
const argon2= require('argon2')

class UserController{
    async getUser(req,res) {
        const userId = req.query.userId
        console.log(req.query.userId)

        try{
            const user = await userModel.findById(userId).select('-password')
            console.log(user)
            if(!user)
                return res.status(400).json({success: false, message: 'User not found'})
            res.json({success: true, user})
        } catch(err){
            throw new Error(err);
        }
    }
    
    async Register(req,res){
        const {email,password, nameAccount,phone,role} = req.body;

        if(!email || !password){
            return res  
                    .status(400)
                    .json({success: false, message:'Missing email and/or password'});
        }

        try{
            const user = await userModel.findOne({email});

            if(user){
                return res
                        .status(400)
                        .json({success: false, message:'Email already taken'});
            }
            const newUser = new userModel({email,password, nameAccount, phone, role})
            await newUser.save();
            
            console.log(process.env.ACCESS_TOKEN_SECRET);

            res.json({
                success: true,
                message: 'User Created successfully',
                // accessToken
            })
        } catch(err){
            throw new Error(err);
        }
    }

    async Login(req,res){
        const {email,password} = req.body;

        //simple validate
        if (!email || !password)
            return res
                    .status(400)
                    .json({success: false, message: 'Missing username and/or password'});
       
        try{
            //Check for existing user
            const user = await userModel.findOne({email})
            if(!user)
                return res
                        .status(400)
                        .json({success:false,message:"Incorrect username or password"})
            if (password !== user.password) {
                return res.status(400).json({
                    success: false,
                    message: "Wrong password"
                });
            }
            //All good
            //return token
            res.json({
                user,
                success:true,
                message:"User logged in successfully"
            })
        }catch(err){
            throw new Error(err);
        }
    }
    async getUserRole(req,res){
        try{
            const findRole = await userModel.find(req.query);
            res.send(findRole)
        }catch(err){
            throw new Error(err);
        }
    }
    async addCart(req,res){
        const product = req.body.productId
        const _id = req.params.id;
        try {
            const user = await userModel.findById(_id);
            user.cart.push(product)
            user.save();
            res.send(user)
        }catch(error){
            throw new Error(error)
        }
    }
    async getOneUser(req,res){
        const _id = req.params.id;
        try{
            const user = await userModel.findById(_id);
            res.send(user)
        } catch(err){
            throw new Error(err)
        }
    }
}

module.exports= new UserController