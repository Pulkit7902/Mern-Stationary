import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { toast } from 'react-toastify'
import { MdEdit } from "react-icons/md";
import Changeuserrole from '../components/Changeuserrole';
const Alluser = () => {
    const moment = require('moment')
    const[openUpdateRole , setOpenUpdateRole] = useState(false)
    const[allUser , setAllUser ] = useState([])
    const [updateuser , setupdateuserdetail] = useState({
        email: "",
        name: "",
        role:"",
        _id:""

    })
    const fetchalluser = async() =>{
        const dataResponse = await fetch(SummaryApi.alluser.url , {
            method: SummaryApi.alluser.method,
            credentials:'include'
        })
        const dataApi = await dataResponse.json()
        console.log(dataApi)
        if(dataApi.success){
            setAllUser(dataApi.data)

        }
        if(dataApi.error){
            toast.error(dataApi.message)
        }

    }
    


    useEffect(()=>{
        fetchalluser();


    },[])
  return (
    <div>
      <table className='w-full  usertable'>
        <thead>
            <tr className='bg-black text-white'>
            <th>S.NO</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created Date</th>
            <th>Action</th>
            </tr>
       
        </thead>
        <tbody>
            {
                allUser.map((el , index) =>{
                    return(
                        <tr>
                           <td>{index+1}</td>
                           <td>{el?.name}</td>
                           <td>{el?.email}</td>
                           <td>{el?.role || setupdateuserdetail(el)}</td>
                           <td>{moment(el?.createdAt).format('LL')}</td>
                           <td>
                            <button className='bg-purple-300 rounded-full text-xl cursor-pointer hover:bg-purple-500'  onClick={()=>{
                                setupdateuserdetail(el)
                                setOpenUpdateRole(true)

                            }}>
                            <MdEdit/>

                            </button>
                            
                          
                           </td>
                           
                        </tr>
                    )
                })
            }
            

        

        </tbody>
      </table>
      {
      openUpdateRole && (
      <Changeuserrole onClose={()=>setOpenUpdateRole(false)} name={updateuser.name}
      email={updateuser.email}
      role={updateuser.role}
      userId={updateuser._id}
      callFunc = {fetchalluser}
      />
      )}
    </div>
    
  )
}

export default Alluser

