import React from 'react'
import { IoClose } from "react-icons/io5";
const Displayimage = ({
    imageurl,
    onClose
}) => {
  return (
  <div className='fixed right-0 left-0 bottom-0 top-0 flex justify-center items-center'>
    <div className='bg-white shadow-lg rounded max-w-5xl mx-auto '>
        <div className='w-fit text-2xl cursor-pointer ml-auto' onClick={onClose}>
            <IoClose/>
        
        </div>
    <div className='flex justify-center p-4 max-h-[110vh] max-w-[80vh]'>
        <img src={imageurl} className='w-full h-full'></img>
      
    </div>
    </div>
  
  </div>
  )
}

export default Displayimage
