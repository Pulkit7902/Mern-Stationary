const backendDomain = process.env.REACT_APP_BACKEND_URL
const SummaryApi = {
    signUp:{
        url:`${backendDomain}/api/signup`,
        method:"post"
    },
    signIn:{
        url:`${backendDomain}/api/singnin`,
        method:"post"
    },
    current_user:{
        url:`${backendDomain}/api/userdetail`,
        method:"get"
    },
    userlogout:{
        url:`${backendDomain}/api/logout`,
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
    getcategorywise:{
        url:`${backendDomain}/api/getcategorywise`,
        method:"post"
    },
    productdetail:{
        url:`${backendDomain}/api/productdetail`,
        method:"post"
    },
    addtocartproduct:{
        url:`${backendDomain}/api/addtocart`,
        method:"post"
    },
    CountAddtoCart:{
        url:`${backendDomain}/api/count`,
        method:"get"
    },
    viewcart:{
        url:`${backendDomain}/api/view`,
        method:"get"
    },
    updatecart:{
        url:`${backendDomain}/api/updatecart`,
        method:"post"
    },
    deletecart:{
        url:`${backendDomain}/api/deletecart`,
        method:"post"
    },
    searchprod:{
        url:`${backendDomain}/api/searchproduct`,
        method:"get"
    },
    filterprod:{
        url:`${backendDomain}/api/filterprod`,
        method:"post"
    },
    payment:{
        url:`${backendDomain}/api/checkout`,
        method:"post"
    },
    orderdisplay:{
        url:`${backendDomain}/api/orderlist`,
        method:"get"
    }
}
export default SummaryApi