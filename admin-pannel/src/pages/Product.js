import React, { useEffect, useState } from 'react';
import UploadProduct from '../components/UploadProduct';
import SummaryApi from '../common';
import AdminProductdetailDisplay from '../components/AdminProductdetailDisplay';

const Product = () => {
  const [allproduct, setAllProduct] = useState([]);
  const [openUploadProduct, setOpenUploadProduct] = useState(false); // Corrected typo

  const fetchAllProduct = async () => { // Removed unused parameter
    try {
      const response = await fetch(SummaryApi.getproduct.url);
      const dataresponse = await response.json();
      setAllProduct(dataresponse?.data || []);
    } catch (error) {
      console.error('Error fetching products:', error); // Added error handling
    }
  };

  useEffect(() => {
    fetchAllProduct();
  }, []); // Dependencies should be included if needed

  return (
    <div>
      <div className='bg-white p-2 flex justify-between items-center'>
        <h2 className='font-bold text-lg'>All Product</h2>
        <button
          className='border-2 border-purple-600 text-purple-600 hover:bg-purple-100 py-1 px-3 rounded-full'
          onClick={() => setOpenUploadProduct(true)} // Corrected typo
        >
          Upload Product
        </button>
      </div>
      <div className='flex py-4 gap-4 px-3 flex-wrap  h-50 w-45 '>
        {
          allproduct.map((product , index)=>{
            return(
              <AdminProductdetailDisplay data={product} key={index+ 'allproduct'} fetchData={fetchAllProduct} />

            )
          })
        }
    
      </div>
      {/* Upload product */}
      {openUploadProduct && (
        <UploadProduct onClose={() => setOpenUploadProduct(false)} fetchData = {fetchAllProduct}/> // Corrected typo
      )}
    </div>
  );
};

export default Product;
