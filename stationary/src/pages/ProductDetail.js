import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import SummaryApi from '../common'
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import DisplayCurrency from '../helpers/DisplayCurrency';
import VerticalCardProduct from '../components/VerticalProductCard';
import CategorywiseProduct from '../components/Categorywiseproduct';
import addToCart from '../helpers/addtocart';
import Context from '../context';
const ProductDetail = () => {
    const [data,setData] = useState({
       productName:"",
       brandName:"",
       category:"",
       productImage:[],
       description:"" ,
       price:"",
       sellingPrice:""
    })
    const [loading ,setLoading] = useState(false)
    const params = useParams()
    console.log("product id->" , params)
    const [activeimage , setactiveimage] = useState("")

    const productimageloading = new Array(4).fill(null)
    const {fetchuseraddtocart} = useContext(Context)
    const fetchproductdetail = async()=>{
        setLoading(true)
        const response = await fetch(SummaryApi.productdetail.url,{
            method:SummaryApi.productdetail.method,
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({
                productId:params?.id
            })

        })
        setLoading(false)
        const dataresponse = await response.json()
        setData(dataresponse?.data)
        setactiveimage(dataresponse?.data?.productImage[0])

    }
    console.log("data is -> ", data)
    useEffect(()=>{
        fetchproductdetail()
    },[params])
    const handlemouse = (imageurl)=>{
      setactiveimage(imageurl)
    }
    const handlecart = async(e,id)=>{
      await addToCart(e,id)
      fetchuseraddtocart()
  }
  return (
    <div className='mx-auto container p-4'>
      <div className=' min-h-[200px] flex flex-col lg:flex-row gap-2'>
      <div className='h-96 flex flex-col lg:flex-row-reverse '>
        <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200'>
          <img src={activeimage} className='h-full w-full object-scale-down mix-blend-multiply'/>

        </div>
        {/* Product image */}
        {
          loading ?(
            <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none'> 
            {
            productimageloading.map(el=>{
              return(
                <div className='h-20 w-20 bg-slate-200 animate-pulse rounded'>

                </div>
              )
  

            })
          }
          </div>
   
          ):(
            <div  className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none'>
              {
                data?.productImage?.map((imgurl ,index)=>{
                  return(
                    <div className='h-20 w-20 bg-slate-200  p-1' key={imgurl}>
                      <img src={imgurl} className='h-full w-full object-scale-down mix-blend-multiply' onMouseEnter={()=>handlemouse(imgurl)}/>

                    </div>
                  )
                })
              }

            </div>
          )
        }
        </div>
     
      {/* Product details */}
      <div className='justify-center items-center'>
        <p className='capitalize bg-purple-400 px-2  rounded-full inline-block w-fit'>{data?.brandName}</p>
        <h2 className='text-2xl lg:text-2xl font-medium'>{data?.productName}</h2>
        <p className='capitalize text-slate-400'>{data?.category}</p>
        <div className='flex gap-2 text-purple-500'>
          <FaStar/>
          <FaStar/>
          <FaStar/>
          <FaStar/>
          <FaStarHalf/>
        </div>
        <div className='flex items-center gap-2 text-xl font-medium'>
          <p className='text-purple-600'>{DisplayCurrency(data?.sellingPrice)}</p>
          <p className='text-slate-400 line-through'>{DisplayCurrency(data?.price)}</p>
        </div>
        <div className='flex gap-2 '>
          <button  className='border-2 border-purple-600  font-medium min-w-[200px] p-2 w-full hover:bg-purple-500'>Buy Now</button>
          <button className='border-2 border-purple-600 rounded p-2 min-w-[200px] w-full hover:bg-purple-500' onClick={(e)=>handlecart(e,params?.id)}>Add to cart</button>
        </div>
        <div>
          <p>Description: {data?.description}</p>
        </div>

      </div>
      
      </div>
      {
        data?.category && (
          <CategorywiseProduct category={data?.category} heading={"Recomended Product"}/>
        )
      }
    

      
    </div>
  )
}

export default ProductDetail
