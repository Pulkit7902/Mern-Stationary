import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import SummaryApi from '../common'
import VerticalProduct from '../components/VerticalProduct'

const SearchProduct = () => {
    const query = useLocation()
    const [data,setdata] = useState([])
    const [loading , setloading] = useState(false)
    const searchinput = useLocation()
    const [search ,setsearch] = useState(searchinput?.search?.split("=")[1])
    console.log("query is" , query.search)
    const fetchProduct = async()=>{
      setloading(true)
      const reponse = await fetch(SummaryApi.searchprod.url+query.search)
      const dataResponse = await reponse.json()
      setloading(false)
      setdata(dataResponse.data)
      console.log("data response is ",dataResponse)

      
    }
    useEffect(()=>{
      fetchProduct()

    },[query])
  return (
    <div className='container mx-auto p-4'>
      {
        loading && (
          <p className='text-lg text-center'>Loading .........</p>

        )
      }
      <p className='text-lg font-semibold my-3 '>Search Results: {data.length}</p>
      {
        data.length === 0 && !loading && (
          <p className='bg-white text-lg text-center p-4'>No Data Found.....</p>


        )
      }
      {
        data.length !==0 && !loading && (
         
              <VerticalProduct data={data}/>
            
          )
        
      }
    </div>
  )
}

export default SearchProduct
