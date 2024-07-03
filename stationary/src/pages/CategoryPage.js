import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import productCategory from '../helpers/productcategory'
import SummaryApi from '../common'

import CategorywiseProduct from '../components/Categorywiseproduct'
import VerticalProduct from '../components/VerticalProduct'

const CategoryPage = () => {
    const params = useParams()
    const [loading ,setloading] = useState(false)
    const [data,setdata] = useState([])
    const [selectcategory ,setselectcategory] = useState({})
    const [filtercategorylist , setfiltercategorylist] = useState({})
    const [saortby ,setsortby] = useState("")
    const fetchdata = async()=>{
      const response = await fetch(SummaryApi.filterprod.url,{
        method:SummaryApi.filterprod.method,
        headers:{
          "content-type":"application/json"
        },
        body:JSON.stringify({
          category:filtercategorylist
        })
      })
      const dataresponse = await response.json()
      setdata(dataresponse?.data ||[])
    }
    // {
    //   params?.category
    // }
    const handleselectcategory = async(e)=>{
      const {name,value,checked} = e.target
      setselectcategory((preve)=>{
        return{
          ...preve,

          [value]:checked
        }
      })
    }
    useEffect(()=>{
      fetchdata()
    },[filtercategorylist])
    useEffect(()=>{
      const arrayofcategory = Object.keys(selectcategory).map(cateogorykeyname=>{
        if(selectcategory[cateogorykeyname]){
          return cateogorykeyname
        }
        return null
      }).filter(el=>el)
      setfiltercategorylist(arrayofcategory)
      console.log("select cat" , arrayofcategory)

    },[selectcategory])
    console.log("slect category is -> " , selectcategory)
    const handlesort = async(e)=>{
      const {value} = e.target
      setsortby(value)
      if(value ==='asc'){
        setdata(preve=>preve.sort((a,b)=>a.sellingPrice - b.sellingPrice))
      }
    
    if(value ==='desc'){
      setdata(preve=>preve.sort((a,b)=>b.sellingPrice - a.sellingPrice))
    }
  }
  useEffect(()=>{

  },[saortby])

  return (
    <div className='container mx-auto p-4 '>
      <div className='hidden lg:grid grid-cols-[200px,1fr] gap-6'>
        <div className='bg-white min-h-[calc(100ch-120px)] p-2'>
          {/* Sort by */}
         
         <div className=''>
          <h3 className='text-lg uppercase font-medium text-slate-500 border-b pb-1 border-slate-500'>Sort by</h3>
          <form className='text-sm flex flex-col gap-2'>
            <div className='flex items-center gap-3'>
              <input type='radio' name='sort' checked={saortby==='desc'} value={"desc"} onChange={handlesort}/>
              <label>Price- High to Low</label>
            </div>
            <div className='flex items-center gap-3'>
              <input type='radio' name='sort' checked = {saortby==='asc'} value={"asc"}onChange={handlesort} />
              <label>Price- Low to High</label>
            </div>
          </form>

         </div>
         {/* filter by */}
         <div className=''>
          <h3 className='text-lg uppercase font-medium text-slate-500 border-b pb-1 border-slate-500'>Category </h3>
          <form className='text-sm flex flex-col gap-2'>
            {
              productCategory.map((categoryname , index)=>{
                return(
                  <div className='flex items-center gap-3'>
                    <input type='checkbox' name={"category"} checked={selectcategory[categoryname?.value]} value={categoryname.value} id={categoryname.value} onChange={handleselectcategory}/>
                    <label htmlFor={categoryname.value}>{categoryname.label}</label>
                  </div>
                )
              })
            }
          </form>

         </div>

           {/* leftside */}
        </div>
          {/* rightside */}
        <div>
          <p className='text-lg text-slate-800 my-2'>Search Results:{data.length}</p>
          {
            data.length !==0 && !loading && (
              <VerticalProduct data={data}/>
            )
        
          }
      
         
        </div>
       

      </div>
     
    </div>
  )
}

export default CategoryPage
