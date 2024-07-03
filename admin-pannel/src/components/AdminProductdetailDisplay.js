import React, { useState } from 'react';
import { MdEdit, MdDelete } from "react-icons/md";
import AdminEdit from './AdminEdit';
import DisplayCurrency from '../helper/DisplayCurrency';

import SummaryApi from '../common';
const AdminProductdetailDisplay = ({ data, onClose, fetchData }) => {
  const [editProduct, setEditProduct] = useState(false);
  const [productData, setProductData] = useState(data);

  const deletecartproduct = async(id)=>{
    const response = await fetch(SummaryApi.deleteprodfromdb.url,{
        method : SummaryApi.deleteprodfromdb.method,
        credentials : 'include',
        headers : {
            "content-type" : 'application/json'
        },
        body : JSON.stringify(
            {   
                _id : id,
                
            }
        )
    })

    const responseData = await response.json()


    if(responseData.success){
      console.log("deleted product")
        
    }
    

 }

  return (
    <div className='bg-white p-4 rounded mb-10'>
      <div className='w-fit ml-auto text-xl' onClick={() => deletecartproduct(productData?._id)}> {/* Pass the index to delete */}
        <MdDelete />
      </div>

      <div className='w-30 h-50'>
        <img
          src={productData?.productImage?.[0] || 'fallback-image-url'} // Fallback image URL if productImage is undefined
          width={100}
          height={80}
          alt={productData?.productName || 'Product image'} // Alt attribute for accessibility
        />
      </div>
      <div className='flex flex-wrap'>
        <h1 className='text-wrap flex-wrap'>{productData?.productName || 'Unnamed Product'}</h1> {/* Fallback text for productName */}
      </div>
      <div className='font-semibold'>
        {DisplayCurrency(productData?.sellingPrice)}
      </div>

      <div className='w-fit ml-auto bg-purple-300 rounded-full hover:bg-purple-700' onClick={() => setEditProduct(true)}>
        <MdEdit />
      </div>
      {editProduct && (
        <AdminEdit productData={productData} onClose={() => setEditProduct(false)} fetchData={fetchData} />
      )}
    </div>
  );
};

export default AdminProductdetailDisplay;

