import logo from './logo.svg';
import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header'
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminHeader from './components/Header';
import { useEffect } from 'react';
import SummaryApi from './common';
import {useDispatch} from 'react-redux'
import { setUserDetail } from './store/userSlice';
import Context from './context';
function App() {
  const dispatch = useDispatch();

  const fetchUserDetails = async()=>{
    const dataResponse = await  fetch('http://localhost:8080/api/adminuserdetail',{
      method : SummaryApi.admindetail.method,
      credentials:'include'
    })
    const DataApi =await dataResponse.json()
    if(DataApi.success){
      dispatch(setUserDetail(DataApi.data))

    }
  }
  useEffect(()=>{
    // User Details
    fetchUserDetails()


  },[])

  return (
    <>
    <Context.Provider value = {{
    fetchUserDetails


  }}>
    <ToastContainer position='top-center'/>

    <AdminHeader/>
    <main className='min-h-[calc(100vh-60px)] pt-2'>
    <Outlet/>

   

    </main>
    <Footer/>
  </Context.Provider>
    </>
  

    
   

   
  );
}

export default App;
