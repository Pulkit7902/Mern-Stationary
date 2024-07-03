const jwt = require('jsonwebtoken');

const AdminModel = require('../model/AdminPannelModel');
async function adminauthToken(req , res , next){
    try{
        const user =await AdminModel.findById(req.userId)
        
        const token =await req.cookies?.token 
        if(!token){
            return res.status(200).json({
                message:"User Not Login",
                error:true,
                success:false
            })
        }
        jwt.verify(token, process.env.TOKEN_SECRET_KEY, function(err, decoded) {
            console.log(err) 
            console.log("decode" , decoded)// bar
        
        console.log("token is ->" , token)
        if(err){
           console.log("error is " ,  err)

        }
        req.userId = decoded?._id
        next()
})}
    catch(err){
        res.json({
            message: err.message || err,
            error: true,
            success: false
        });

    }
}
module.exports = adminauthToken