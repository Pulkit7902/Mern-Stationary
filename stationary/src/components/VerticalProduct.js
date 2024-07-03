import React, { useContext, useEffect } from 'react'
import Scrolltop from '../helpers/Scrolltop'
import DisplayCurrency from '../helpers/DisplayCurrency'
import Context from '../context'
import addToCart from '../helpers/addtocart'
import { Link } from 'react-router-dom'

const VerticalProduct = ({data = []}) => {
    const {fetchuseraddtocart} = useContext(Context)
    const handlecart = async(e,id)=>{
        await addToCart(e,id)
        fetchuseraddtocart()
    }
  return (
    <div className=' grid grid-cols-[repeat(auto-fit,minmax(300px,320px))]  justify-between items-center gap-4 md:gap-6 overflow-x-scroll scrollbar-none transition-all ' >

    {
        data.map((product  , index)=>{
            return(
                <Link to={"/product/" + product?._id} className='w-full min-w-[280px]  md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow  ' onClick={Scrolltop}>
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
                    <button className='text-sm hover:bg-purple-700  bg-purple-500 px-2 py-1 rounded-full' onClick={(e)=>{handlecart(e,product?._id)}}>Add to cart</button>   
         
                </div>
        
              </Link>

            )
        })
    }
    </div>
  )
}

export default VerticalProduct
