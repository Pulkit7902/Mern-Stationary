const userModel = require("../../model/userModel");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


async function userSignin(req , res){
    try{
        const {email , password} = req.body;
        const user = await userModel.findOne({email});

        if (!email) {
            throw new Error("Please Provide email");
        }
        if (!password) {
            throw new Error("Please provide password");
        }
        if(!user){
            throw new Error ("User not found");

        }
        const checkpassword= await bcrypt.compare(password , user.password);
        console.log("check password " , checkpassword)
     

        if(checkpassword){
            const tokenData = {
                _id:user._id,
                email:user.email,


            }
            const token = await jwt.sign(
              tokenData,process.env.TOKEN_SECRET_KEY
              , { expiresIn: 60 * 60*8 });
              

        
        const tokenOption = {
            httpOnly:true , 
            secure:true,
            sameSite:'None'
        }
        res.cookie("token" , token , tokenOption).json({
            message:"Login Successfully",
            data:token,
            success:true,
            error:false
        
        })
    }
    else{
        throw new Error("please check your password")
    }}
    catch(err){
        res.json({
            message: err.message || err,
            error: true,
            success: false
        });

    }

}
module.exports = userSignin