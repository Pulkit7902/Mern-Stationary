import React, { useContext, useState } from 'react'
import Logo from './Logo'
import { FaSearch } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import userSlice, { setUserDetail } from '../store/userSlice';
import Context from '../context';


const Header = () => {
    const [menuDisplay,setMenuDisplay] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const context = useContext(Context)
    const searchinput = useLocation()
    const [search ,setsearch] = useState(searchinput?.search?.split("=")[1])
    const handleLogout = async() =>{
        const fetchdata = await fetch(SummaryApi.userlogout.url,{
            method:SummaryApi.userlogout.method,
            credentials:'include'
        })
        const data = await fetchdata.json();
        if(data.success){
            toast.success(data.message)
            dispatch(setUserDetail(null))
            


            
        }
        if(data.error){
            toast.error(data.error)
        }
    }
  const user = useSelector(state =>state?.user?.user)
  const handlesearch = (e)=>{
    const {value} = e.target
    setsearch(value)
    if(value){
        navigate(`/search?q=${value}`)
    }

  }
   
   
  return (
    <header className='h-16  shadow-md bg-white fixed w-full z-40'>
        <div className='h-full container mx-auto flex items-center  justify-between'>
            <div className=''>
                <Link to={"/"}>
                  <Logo w = {100} h = {60} className='-mx-1'/>
                </Link>
            </div>
            <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full pl-2'>
                <input type = 'text' placeholder='Search product here' className='w-full outline-none pl-2' onChange={handlesearch} value={search}/>
                <div className='text-lg min-w-[50px]  h-8 bg-purple-600 flex items-center justify-center rounded-r-full '>
                    <FaSearch/>
                </div>
            </div>
            <div className='flex items-center gap-10'>
                {
                    user?._id &&(
                        <div className='text-3xl cursor-pointer relative flex justify-center' onClick={()=>setMenuDisplay(preve => !preve)}>
                        {
                        user?.profilepic ? (
                                <img src={user?.profilepic} className='w-10 h-10 rounded-full'/>
        
                            ) : (
                                <FaUser/>
        
                            )
                        }
                        
                    </div>
                    )
                }
                {
                    menuDisplay && (
                        <div className='absolute bg-white bottom-0 top-[3.25rem] right-[17.5rem] w-32 h-fit p-2 shadow-lg rounded'>
                        <nav>
                            <Link to={"/order"} className='whitespace-nowrap text-center hidden md:block hover:bg-slate-100 p-2' onClick={()=>setMenuDisplay(preve => !preve)}>Order</Link>

                        </nav>
                    </div>
                    )
                }
            {
                user?._id && (
       
            <Link to={"/cart"} className='text-xl relative'>
                <span>
                <FaShoppingCart/>

                </span>
                
                    
                        <div className='bg-purple-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3 '>
                        <p className='text-xs'>{context?.addtocartcount}</p>
                    </div>
                    
                
            
                
            </Link>)
            }
            <div>
                {
                   user?._id ? (
                    <button onClick={handleLogout} type='submit' className='px-3 py-1 rounded-full text-white bg-purple-500 hover:bg-purple-700'>Logout</button>

                   ):(
                
                <Link to={"/login"}>
                <button type='submit' className='px-3 py-1 rounded-full text-white bg-purple-500 hover:bg-purple-700'>Login</button>

                </Link>)}

            </div>

            </div>

        </div>
    </header>

  )
}

export default Header
