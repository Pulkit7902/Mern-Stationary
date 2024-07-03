const userModel = require("../../model/userModel");

async function allUserDetails(req ,res){

    try {
        console.log("userid" , req.userId)
        const alluser = await userModel.find()
        res.json({
            message:"User Detail Fetch Successfully",
            data:alluser,
            success:true,
            error:false


        })



        
    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false
        });
        
    }
}
module.exports  = allUserDetails