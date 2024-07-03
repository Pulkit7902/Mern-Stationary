import SummaryApi from "../common"

const fetchcategorywiseproduct = async(category)=>{
    const response = await fetch(SummaryApi.getcategorywise.url,{
       method:SummaryApi.getcategorywise.method,
       headers:{
        "content-type":"application/json"
       },
       body:JSON.stringify({
        category:category
       }) 
    })
    const dataresponse = await response.json()
    return dataresponse
}
export default fetchcategorywiseproduct