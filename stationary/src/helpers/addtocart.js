import { toast } from "react-toastify"
import SummaryApi from "../common"

const addToCart = async(e,id)=>{
    e?.stopPropagation()
    e?.preventDefault()
    const response = await fetch(SummaryApi.addtocartproduct.url,{
        method:SummaryApi.addtocartproduct.method,
        credentials:'include',
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({
            productId:id
        })

    })
    const dataresponse = await response.json()
    if(dataresponse.success){
        toast.success(dataresponse.message)
    }
    if(dataresponse.error){
        toast.error(dataresponse.message)
    }
    return dataresponse



}
export default addToCart