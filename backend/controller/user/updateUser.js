const userModel = require("../../model/userModel");

async function updateUser(req , res){
    try {
        const sessionUser = req.userId
        const {userId , email ,name , role} =req.body
        const payload = {
            ...(email && {email:email}),
            ...(name && {name:name}),
            ...(role && {role:role}),

        }
        const user = await userModel.findById(sessionUser)
        console.log("user role ->  " , user)
        const updateUserDetail = await userModel.findByIdAndUpdate(userId , payload)

        
        res.json({
            data:updateUserDetail,

            message:"user Updated",
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
module.exports = updateUser