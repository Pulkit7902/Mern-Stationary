import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import loginicon from '../assets/loginlogo.jpeg'
import SummaryApi from '../common'
import { toast } from 'react-toastify'
import Context from '../context'
const Signin = () => {
    const navigate = useNavigate()
    const {fetchUserDetails} = useContext(Context)
    const [data,setData] = useState({
        email: "",
        password:""
    
      })
      const handleOnChange = (e)=>{
        const{name , value} = e.target
        setData((preve) =>{
            return{
            ...preve,
            [name] : value
    
    
      }})
     
      
      }
      const handleSubmit = async(e)=>{
        e.preventDefault();
          const dataResponse = await fetch('http://localhost:8080/api/adminsignin',{
          method : SummaryApi.adminsignin.method,
          credentials:'include',
          headers:{
            "content-type": "application/json"
    
          },
          body: JSON.stringify(data)
        })
        const dataapi = await dataResponse.json()
    
        if(dataapi.success){
        toast.success(dataapi.message)
        navigate("/admin")
        fetchUserDetails()
        
      }
      if(dataapi.error){
        toast.error(dataapi.message)
    
      
    
        console.log("data" , dataapi)}
        else{
          console.log("please check password")
        }
      
    
    
    
    
    
      
      console.log("data is->" , data)}
  return (
    <section id='login'>
    <div className='mx-auto container p-4'>
        <div className='bg-white p-5 w-full max-w-md mx-auto'>
            <div className='w-20 h-30 mx-auto'>
                <img src={loginicon} alt='login-icon'></img>
            </div>
            <form  className='pt-6'onSubmit={handleSubmit} >
            <div className='grid'> 
                <label> Email: </label>
                <div className='bg-slate-200'>
                <input type='email'
                 placeholder='enter your email' 
                 name='email'
                 value={data.email}
                 onChange={handleOnChange}
                 className='w-full h-full outline-none bg-transparent'/>
                </div>
                
               

            </div>
            <div>
                <label> Password: </label>
                <div className='bg-slate-200'>
                <input type='password'
                 placeholder='enter your password'
                 name='password'
                 value={data.password}
                 onChange={handleOnChange}
                  className='w-full h-full outline-none bg-transparent'/>

                </div>
                <Link to={"/forget-password"}

                className='block w-fit ml-auto hover:underline hover:text-purple-400'>
                Forgot Password
                </Link>
               

            </div>
            <button className='bg-purple-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-1'>Login </button>
        </form>
        <p className='my-2 '>Don't have account ? <Link to={"/sign-up"} className='hover:text-purple-600' >Sign up</Link></p>

        </div>

      
    </div>
</section>
  )
}

export default Signin
