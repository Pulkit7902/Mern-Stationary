import React from 'react'
import CategoryProduct from '../components/CategoryProduct'
import BannerProduct from '../components/BannerProduct'
import HorizonatalCardProduct from '../components/HorizonatalCardProduct'
import VerticalCardProduct from '../components/VerticalProductCard'

const Home = () => {
  return (
    <div>
      <div>
        <CategoryProduct/>
        <BannerProduct/>
        <HorizonatalCardProduct category={"paperproduct"} heading={"Good Quality Notebooks"}/>
        <HorizonatalCardProduct category={"art&craft"} heading={"Decorative Items"}/>  
        <HorizonatalCardProduct category={"educationsupplies"} heading={"School Bags"}/> 
        <HorizonatalCardProduct category={"officesupplies"} heading= {"Office Supplies"}/> 

        <VerticalCardProduct category={"paperproduct"} heading={"Good Quality Notebooks"} />  
        <VerticalCardProduct category={"books"} heading={"Good Quality Books"} /> 
        <VerticalCardProduct category={"educationsupplies"} heading={"School Bags"}/>  
    
      </div>
    </div>
  )
}

export default Home
