import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchcategorywiseproduct from '../helpers/fetchCastegoryWiseProduct'
import DisplayCurrency from '../helpers/DisplayCurrency'
import { MdOutlineNavigateNext } from 'react-icons/md'
import { GrFormPrevious } from 'react-icons/gr'
import { Link } from 'react-router-dom'
import Context from '../context'
import addToCart from '../helpers/addtocart'

const VerticalCardProduct = ({category ,heading}) => {
    const [data,setData] = useState([])
    const [loading,setloading] = useState(false)
    const loadingList = new Array(13).fill(null)
    const {fetchuseraddtocart} = useContext(Context)
    const fetchData = async()=>{
        setloading(true)
       const CategoryProduct = await fetchcategorywiseproduct(category) 
       setloading(false)
       setData(CategoryProduct?.data)

    }
    useEffect(()=>{
        fetchData()

    },[])
    const [scroll,setscroll] = useState(0)
    const scrollelement = useRef()
    const scrollright = ()=>{
        scrollelement.current.scrollLeft +=300
    }
    const scrolleft = ()=>{
        scrollelement.current.scrollLeft -=300
    }
    const handlecart = async(e,id)=>{
        await addToCart(e,id)
        fetchuseraddtocart()
    }
  return (
    <div className='container mx-auto px-4 my-7 relative'>
        <h2 className='text-lg font-semibold py-2'>{heading}</h2>
        <div className='flex  items-center gap-4 md:gap-6 overflow-x-scroll scrollbar-none transition-all 'ref={scrollelement} >
        <button className='bg-white shadow-md rounded-full p-1 absolute left-0 hidden md:block'onClick={scrolleft} >
                    <GrFormPrevious/>

                </button>
                <button className='bg-white shadow-md rounded-full p-1 absolute right-0 hidden md:block' onClick={scrollright} ><MdOutlineNavigateNext/></button>
    
        {
            data.map((product  , index)=>{
                return(
                    <Link to={"product/" + product?._id} className='w-full min-w-[380px] md:min-w-[380px] max-w-[380px] md:max-w-[380px]  bg-white rounded-sm shadow-md '>
                    <div className='bg-slate-200 h-48 p-2 min-w-[120px] md:min-w-[100px] flex justify-center items-center'>
                        <img src={product.productImage[0]} className='object-scale-down h-full hover:scale-110 mix-blend-multiply'></img>
            
                    </div>
                    <div className='p-4 grid'>
                        <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1'>{product?.productName}</h2>
                        <p className='capitalize text-slate-500'>{product?.category}</p>
                        <div className='flex gap-2'>
                            <p className='font-medium text-purple-600'>{DisplayCurrency(product?.sellingPrice)}</p>
                            <p className='text-sm text-slate-500 line-through'>{DisplayCurrency(product?.price)}</p>
                        </div>
                        <button className='text-sm hover:bg-purple-700  bg-purple-500 px-2 py-1 rounded-full' onClick={(e)=>{handlecart(e , product?._id)}}>Add to cart</button>   
             
                    </div>
            
                  </Link>

                )
            })
        }
        </div>
  

    </div>
  )
}

export default VerticalCardProduct

