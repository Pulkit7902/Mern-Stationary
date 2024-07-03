import React, { useState } from 'react'
import img1 from '../assets/banner/img2.jpg'
import img2 from '../assets/banner/img1.jpeg'
import img3 from '../assets/banner/img3.jpg'
import img4 from '../assets/banner/img4.jpg'
import mobileimg1 from '../assets/banner/MobileImage_1.jpg'
import { GrFormPrevious } from "react-icons/gr";
import { MdOutlineNavigateNext } from "react-icons/md";

const BannerProduct = () => {
    const LaptopImages = [
        img1,
        img2,
        img3,
        img4

    ]
    const mobileImage = [
      mobileimg1,

    ]
    const [currentimage ,setcurrentimage] = useState(0)
    const nexstImage = ()=>{
      if((LaptopImages.length-1)>currentimage){
        
          setcurrentimage(preve => preve+1)
    
        

      }
    }
      const prevImage = ()=>{
        setcurrentimage(preve => preve -1)
  
      }
      return (
    <div className='conatiner mx-auto mt-2 px-6 rounded '>
        <div className='h-40 md:h-52 w-full bg-slate-200 relative'>
            <div className='absolute z-10 h-full w-full md:flex items-center hidden'>
                <div className=' flex justify-between w-full text-sm'>
                <button className='bg-white shadow-md rounded-full p-1'onClick={prevImage} >
                    <GrFormPrevious/>

                </button>
                <button className='bg-white shadow-md rounded-full p-1' onClick={nexstImage}><MdOutlineNavigateNext/></button>
                </div>
    
            </div>
          <div className='hidden  md:flex h-full w-full overflow-hidden'>
          {
            LaptopImages.map((el,index)=>{
                return(
                    <div className='w-full h-full min-h-full min-w-full translate' style={{transform:`translateX(-${currentimage*100}%)`}}>
                    <img src={el} className='h-full w-full'></img>
                    </div>
                )
            })
          }
          </div>
          {/* Mobile Version */}
          <div className='flex h-full w-full overflow-hidden md:hidden'>
          {
            mobileImage.map((el,index)=>{
                return(
                    <div className='w-full h-full min-h-full min-w-full translate' style={{transform:`translateX(-${currentimage*100}%)`}}>
                    <img src={el} className='h-full w-full'></img>
                    </div>
                )
            })
          }
          </div>
    
    </div>
    </div>

  )
}

export default BannerProduct
