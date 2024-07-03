import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { Link } from 'react-router-dom'

const CategoryProduct = () => {
  const [categoryproduct , setcategoryproduct] = useState([])
  const categoryloading =new Array(13).fill(null)
  const [loading,setloading] = useState(false)
  const fetchCategoryProduct = async()=>{
    setloading(true)
    const response = await fetch(SummaryApi.getproductcategory.url,{
      method:SummaryApi.getproductcategory.method,
      credentials:'include'
    })
    const dataResponse = await response.json()
    setloading(false)
    setcategoryproduct(dataResponse.data)



  }
  useEffect(()=>{
    fetchCategoryProduct()

  },[])
  return (
    <div className='container mx-auto px-4 '>
      <div className='flex items-center gap-3 justify-between overflow-scroll  scrollbar-none'>
      {
        loading ? (
          categoryloading.map((el,index)=>{
            return(
              <div className='h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden animate-pulse bg-slate-200'>

            
          
              </div>
            )
          })
          
    


        ):
        (
            categoryproduct.map((product , index)=>{
            return (
              <Link to={"/category-page/" + product?.category}>
                <div className='cursor-pointer'>
                <div className=' w-16 h-16 rounded-full overflow-hidden p-4 flex bg-slate-200 justify-center items-center'>
                  <img src={product?.productImage[0]} alt={product?.category} className='h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all'/>
  
                </div>
                <p className='text-center items-center text-sm md:text-base capitalize'>{product?.category}</p>
  
            </div>
              </Link>
        
            )
  
          })
        )
      
      }
      </div>
     
      
    </div>
  )
}

export default CategoryProduct
