import React, { useContext, useEffect, useState } from 'react'
import SummaryApi from '../common'
import Context from '../context'
import DisplayCurrency from '../helpers/DisplayCurrency'
import { MdDelete } from "react-icons/md";
import {loadStripe} from '@stripe/stripe-js';
const Cart = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const context = useContext(Context)
  
    const loadingcart = new Array(context.addtocartcount).fill(null)
    const fetchdata = async () => {
        setLoading(true)
        const response = await fetch(SummaryApi.viewcart.url, {
            method: SummaryApi.viewcart.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            }
        })
        const responsedata = await response.json()
        if (responsedata.success) {
            setData(responsedata.data)
        }
        console.log("data from API is->", responsedata)
        setLoading(false)
    }
    useEffect(() => {
        fetchdata()
    }, [])
    const increaseqty = async(id,qty)=>{
        const response = await fetch(SummaryApi.updatecart.url,{
            method:SummaryApi.updatecart.method,
            credentials:'include',
            headers:{
                "content-type":"application/json"
            },
            body: JSON.stringify({
                _id:id,
                quantity: qty + 1
            })
        })
        const responsedata  = await response.json()
        if(responsedata.success){
            fetchdata()
        }
    }
    const decraseQty = async(id,qty) =>{
        if(qty >= 2){
             const response = await fetch(SummaryApi.updatecart.url,{
                 method : SummaryApi.updatecart.method,
                 credentials : 'include',
                 headers : {
                     "content-type" : 'application/json'
                 },
                 body : JSON.stringify(
                     {   
                         _id : id,
                         quantity : qty - 1
                     }
                 )
             })
 
             const responseData = await response.json()
 
 
             if(responseData.success){
                 fetchdata()
             }
         }
     }
     const deletecartproduct = async(id)=>{
        const response = await fetch(SummaryApi.deletecart.url,{
            method : SummaryApi.deletecart.method,
            credentials : 'include',
            headers : {
                "content-type" : 'application/json'
            },
            body : JSON.stringify(
                {   
                    _id : id,
                    
                }
            )
        })

        const responseData = await response.json()


        if(responseData.success){
            fetchdata()
            context.fetchuseraddtocart()
        }
        

     }
     const totalqty = data.reduce((preve,curr)=>preve + curr.quantity,0)
     const totalprice =data.reduce((preve,curr)=>preve + (curr.quantity * curr?.productId?.sellingPrice),0)
     const handlePayment = async()=>{
        const stripepromise = await loadStripe('pk_test_51PWxNz2NoS72AiyRwzfyA20uvyhkbDziGeSrzDRRzOYLFVvmC93iLdVUyk22f4f10RPc9IdQdFsV5viGNiSPGpvl00vb4MhQOC')
        const response = await fetch(SummaryApi.payment.url,{
            method:SummaryApi.payment.method,
            credentials:'include',
            headers:{
                "content-type" :"application/json"
            },
            body:JSON.stringify({
                cart_item:data
            })

        
        })
        const responseData = await response.json()
        if(responseData?.id){
            stripepromise.redirectToCheckout({sessionId:responseData?.id})

        }
        console.log("response data is ->" , responseData)

     }

    return (
        <div className='container mx-auto'>
            <div className='text-center text-lg my-3'>
                {
                    data.length === 0 && !loading && (
                        <p className='bg-white py-5'>Empty Cart</p>
                    )
                }
            </div>
            <div className='flex flex-col lg:flex-row gap-10 justify-between'>
                {/* view product */}
                <div className='w-full max-w-3xl'>
                    {
                        loading ? (
                            loadingcart.map((_, index) => {
                                return (
                                    <div key={index} className='bg-slate-200 w-full h-32 my-2 border border-slate-300 animate-pulse'>
                                    </div>
                                )
                            })
                        ) : (
                            data.map((product) => {
                                return (
                                    <div key={product?._id} className='w-full bg-white h-32 my-2 border border-slate-300  rounded grid grid-cols-[128px,1fr] gap-5'>
                                        <div className='w-32 h-full bg-slate-200'>
                                            <img src={product?.productId?.productImage[0]} alt={product?.productId?.productName} className='w-full h-28 object-scale-down mix-blend-multiply' />
                                        </div>
                                        <div className='px-4 py-2 relative'>
                                            <div className='absolute right-0' onClick={()=>deletecartproduct(product?._id)}>
                                                <MdDelete/>
                                            </div>

                                        
                                        <div>
                                            <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>{product?.productId?.productName}</h2>
                                            <p className='capitalize text-slate-500'>{product?.productId?.category}</p>
                                            <div className='flex items-center justify-between'>
                                            <p className='text-lg'>{DisplayCurrency(product?.productId?.sellingPrice)}</p>
                                            <p className='text-lg text-slate-600'>{DisplayCurrency(product?.productId?.sellingPrice * product?.quantity)}</p>
                                            </div>
                                            <div className='flex items-center gap-3 mt-1'>
                                                <button className='border border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white w-6 h-6 flex justify-center items-center rounded' onClick={()=>decraseQty(product?._id , product?.quantity)}>-</button>
                                                <span>{product?.quantity}</span>
                                                <button className='border border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white w-6 h-6 flex justify-center items-center rounded' onClick={()=>increaseqty(product?._id , product?.quantity)}>+</button>
                                            </div>

                                        </div>    
                                    </div>
                                    </div>
                                )
                            })
                        )
                    }
                </div>
                {/* total product */}
                {
                    data[0] && (
                        <div className='mt-5 lg-mt-0 w-full max-w-sm'>
                        {
                            loading ? (
                                <div className='bg-slate-200 h-36 border border-slate-200 animate-pulse'>
                                    Total
                                </div>
                            ) : (
                                <div className='bg-white h-36'>
                                    <h2 className='text-white bg-purple-600 px-4 py-1'>Summary</h2>
                                    <div className='flex items-center gap-2 font-medium justify-between'>
                                        <p>Quantity: </p>
                                        <p>{totalqty}</p>
    
                                    </div>  
                                    <div className='flex items-center gap-2 justify-between font-medium'>
                                        <p>Total price:</p>
                                        <p>{DisplayCurrency(totalprice)}</p>
                                    </div> 
                                    <button className='bg-blue-600 p-2 text-white w-full relative mb-auto' onClick={handlePayment}>Proceed For Payment</button>
                                </div>
                            )
                        }
                    </div>

                    )
                }
              
            </div>
        </div>
    )
}

export default Cart


