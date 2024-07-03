import logo from './logo.svg';
import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header'
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import SummaryApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetail } from './store/userSlice';
function App() {
  const dispatch = useDispatch();
  const [addtocartcount ,setaddtocartcount] = useState(0)


  const fetchUserDetails = async()=>{
    const dataResponse = await  fetch('http://localhost:8080/api/userdetail',{
      method : SummaryApi.current_user.method,
      credentials:'include'
    })
    const DataApi =await dataResponse.json()
    if(DataApi.success){
      dispatch(setUserDetail(DataApi.data))

    }
  }
  const fetchuseraddtocart = async()=>{
    const response =  await fetch(SummaryApi.CountAddtoCart.url,{
      method:SummaryApi.CountAddtoCart.method,
      credentials:'include'
    })
    const dataAppi = await response.json()
    console.log("data api is->" , dataAppi)
    setaddtocartcount(dataAppi?.data?.count)
  
  }
  useEffect(()=>{
    // User Details
    fetchUserDetails()
    // user detail add to cart
    fetchuseraddtocart()


  },[])
  return (
  <>
  <Context.Provider value = {{
    fetchUserDetails,
    addtocartcount,
    fetchuseraddtocart


  }}>
    <ToastContainer position='top-center'/>

    <Header/>
    <main className='min-h-[calc(100vh-60px)] pt-20'>
    <Outlet/>
   

    </main>
    <Footer/>
  </Context.Provider>

    
   
  </>
  );
}

export default App;
