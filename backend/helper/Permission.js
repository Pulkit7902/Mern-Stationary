const productModel = require("../model/productModel")
// const userModel = require("../model/userModel")

const uploadProductPermission = async(userid)=>{
    const user = await productModel.findById(userid)
    if(user.role !=='GENERAL'){
        return false
    }
    return true
}
module.exports = uploadProductPermission