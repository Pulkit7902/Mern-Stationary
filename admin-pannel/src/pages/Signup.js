import React, { useState } from 'react'
import loginicon from '../assets/loginlogo.jpeg'
import { Link ,useNavigate} from 'react-router-dom'
import imageTobase64 from '../helper/imageTobase64'
import { toast } from 'react-toastify'
import SummaryApi from '../common'

const Signup = () => {
  const [data,setData] = useState({
    email: "",
    password:"",
    name:"",
    confirmpassword:"",
    
    profilepic:""


  })
  const navigate = useNavigate()
  const handleOnChange = (e)=>{
    const{name , value} = e.target
    setData((preve) =>{
        return{
        ...preve,
        [name] : value


  }})
 
  
  }


  const handleUploadPic = async(e)=>{
    const file =e.target.files[0]
    const imagePic = await imageTobase64(file)
    console.log("imagepic is " , imagePic)
    setData((preve)=>{
      return{
        ...preve,
        profilepic: imagePic
      }

    })
  }
  const handleSubmit = async(e)=>{
    e.preventDefault()
    if(data.password === data.confirmpassword){

    
    const dataResponse = await fetch('http://localhost:8080/api/adminsignup',{
      method : SummaryApi.adminsignup.method,
      headers:{
        "content-type": "application/json"

      },
      body: JSON.stringify(data)
    })
    const dataapi = await dataResponse.json()

    if(dataapi.success){
    toast.success(dataapi.message)
    navigate("/")
  }
  if(dataapi.error){
    toast.error(dataapi.message)

  }

    console.log("data" , dataapi)
  }
  else{
    toast.error("please check password")
  }
}

  return (
<section id='signup'>
    <div className='mx-auto container p-4'>
        <div className='bg-white p-5 w-full max-w-md mx-auto'>
            <div className='w-20 h-30 mx-auto relative overflow-hidden rounded-full'>
              <div>
              <img src={data.profilepic || loginicon} alt='login-icon'></img>
              </div>
              <form >
                <label>
                <div className='text-xs bg-slate-200 bg-opacity-50 py-4 cursor-pointer text-center absolute bottom-0 w-full'>
                Upload Photo
              </div>
                  <input type='file' className='hidden' onChange={handleUploadPic}/>
                </label>

              </form>

                
            </div>
            <form  className='pt-6 flex-col gap-2' onSubmit={handleSubmit}  method='post'>
            <div className='grid'> 
                <label> Name: </label>
                <div className='bg-slate-200 '>
                <input type='text'
                name='name'
                value={data.name}
                onChange={handleOnChange}
                placeholder='enter your name' className='w-full h-full outline-none bg-transparent'
              />
                </div>
                
               

            </div>
              
            <div className='grid'> 
                <label> Email: </label>
                <div className='bg-slate-200'>
                <input type='email'
                name='email'
                value={data.email}
                onChange={handleOnChange}
                placeholder='enter your email' 
                required
                className='w-full h-full outline-none bg-transparent'/>
                </div>
                
               

            </div>
            <div>
                <label> Password: </label>
                <div className='bg-slate-200'>
                <input type='password'
                name='password'
                value={data.password}
                onChange={handleOnChange}
                placeholder='enter your password' className='w-full h-full outline-none bg-transparent'
                />
                </div>

               

            </div>
            <div>
                <label> Confirm Password: </label>
                <div className='bg-slate-200'>
                <input type='password'
                name='confirmpassword'
                value={data.confirmpassword}
                onChange={handleOnChange}
                
                placeholder='enter your password' className='w-full h-full outline-none bg-transparent'/>
                </div>

               

            </div>
            <button className='bg-purple-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-1'>Sign-up </button>
        </form>
        <p className='my-2 '>Already have account ? <Link to={"/"} className='hover:text-purple-600' >Login</Link></p>
        

        </div>

      
    </div>
</section>
  )
}

export default Signup