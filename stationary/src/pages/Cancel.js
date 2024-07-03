import React from 'react'
import caneclimg from '../../src/assets/Cancelimg.png'
import { Link } from 'react-router-dom'
const Cancel = () => {
  return (
    <div className=' w-full max-w-md mx-auto flex justify-center items-center flex-col p-4'>
    <img src={caneclimg}
    width={150}
    height={150}
    />
    <p className='text-red-500 font-bold text-xl'>Payment Declined</p>
    <Link to={"/"} className='p-2 px-3 mt-5 border-2 border-green-600 rounded font-semibold text-green-600 hover:bg-green-500 hover:text-white '>Go back to Home Page</Link>
 
</div>
  )
}

export default Cancel
