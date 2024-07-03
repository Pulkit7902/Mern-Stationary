const backendDomain = "http://localhost:8080"
const SummaryApi = {
    adminsignup:{
        url:`${backendDomain}/api/adminsignup`,
        method:"post"
    },
    adminsignin:{
        url:`${backendDomain}/api/adminsignin`,
        method:"post"
    },
    adminlogout:{
        url:`${backendDomain}/api/adminlogout`,
        method:"get"
    },
    admindetail:{
        url:`${backendDomain}/api/adminuserdetail`,
        method:"get"
    },
    alluser:{
        url: `${backendDomain}/api/alluser`,
        method:"get"



    },
    updateuser:{
        url:`${backendDomain}/api/update`,
        method:"post"
    },
    productdata:{
        url:`${backendDomain}/api/productdata`,
        method:"post"
    },
    getproduct:{
        url:`${backendDomain}/api/getproduct`,
        method :"get"
    },
    editproduct:{
        url:`${backendDomain}/api/edit`,
        method:"post"
    },
    getproductcategory:{
        url:`${backendDomain}/api/getcategory`,
        method:"get"
    },
    deleteprodfromdb:{
        url:`${backendDomain}/api/deleteprod`,
        method:"post"
        
    }

}
export default SummaryApi