import React from 'react'
import successimg from '../../src/assets/Successimage.png'
import { Link } from 'react-router-dom'
const Success = () => {
  return (
    <div className='bg-slate-200 w-full max-w-md mx-auto flex justify-center items-center flex-col p-4'>
        <img src={successimg}
        width={150}
        height={150}
        />
        <p className='text-green-700 font-bold text-xl'>Payment Succesfully</p>
        <Link to={"/order"} className='p-2 px-3 mt-5 border-2 border-green-600 rounded font-semibold text-green-600 hover:bg-green-500 hover:text-white '>Go To Order page</Link>
     
    </div>
  )
}

export default Success
