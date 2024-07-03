import React, { useContext, useState } from 'react'
import ROLE from '../common/role'
import { IoClose } from "react-icons/io5";
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';
const Changeuserrole = ({
  name , 
  email,
  role,
  onClose,
  userId,
  callFunc



}) => {
  
    const [userRole , setUserRole] = useState(role)
    const handleOnChangeSelect = (e)=>{
      setUserRole(e.target.value)
      
    }
    const updateUserDetail = async()=>{
      const DataResponse = await fetch(SummaryApi.updateuser.url,{
        method:SummaryApi.updateuser.method,
        credentials:'include',
        headers:{
          "content-type":"application/json"

        },
        body:JSON.stringify({
          userId:userId,

          role : userRole
        })
      })
      const responseData = await DataResponse.json()
      if(responseData.success){
        toast.success(responseData.message)
        onClose()
        callFunc()
      }
      console.log("updated role is ->"  , responseData)

    }
  return (
    <div className=' fixed w-full h-full flex justify-center items-center z-10  top-21 -bottom-10 bg-slate-200 bg-opacity-50'>
        <div className='mx-auto w-full bg-white shadow-md p-4  max-w-sm'>
           
                <button className='block ml-auto' onClick={onClose}>
                <IoClose/>
                </button>
            
        <h1 className='pb-4 text-lg font-medium'>ChangeUserRole</h1>
        <p>Name: {name}</p>
        <p>Email: {email}</p>
        <div className='flex items-center justify-between my-4'>
            <p>Role:</p>
            <select className='border px-4 py-1' value={userRole} onChange={handleOnChangeSelect}>
          {
            Object.values(ROLE).map(el =>{
                return (
                    <option value={el} key={el}>{el}</option>
                )

            })
          }
        </select>
        </div>
        <button className='w-fit mx-auto block border p-2 rounded-full bg-purple-600 hover:bg-purple-700 text-white' onClick={updateUserDetail}>Change Role</button>

        </div>
      
    </div>
  )
}

export default Changeuserrole
