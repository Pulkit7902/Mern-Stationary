const AdminModel = require("../../model/AdminPannelModel");

async function AdminUserDetail(req,res){
    try {
        console.log("userId",req.userId)
        const user = await AdminModel.findById(req.userId)

        res.status(200).json({
            data : user,
            error : false,
            success : true,
            message : "User details"
        })

        console.log("user",user)
    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
             success: false
        });
    

        
    }
}
module.exports  = AdminUserDetail