import React, { useState } from 'react';
import { IoClose } from "react-icons/io5";
import productCategory from '../helper/productcategory';
import { IoMdCloudUpload } from "react-icons/io";
import uploadImage from '../helper/uploadImage';
import Displayimage from './Displayimage';
import { MdDelete } from "react-icons/md";
import SummaryApi from '../common';
import {toast} from 'react-toastify'
const UploadProduct = ({ onClose , fetchData }) => {
    const [data, setData] = useState({
        productName: "",
        brandName: "",
        category: "",
        productImage: [],
        description: "",
        price: "",
        sellingPrice: "",
    });
    const [openFullscreenImage, setOpenFullscreenImage] = useState(false);
    const [uploadProductImage, setUploadImage] = useState("");
    const [fullImage, setFullImage] = useState("");

    const handleOnChange = (e) => {
        const { id, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [id]: value
        }));
    };

    const handleUploadProduct = async (e) => {
        const file = e.target.files[0];
        setUploadImage(file.name);
        const uploadImageCloudinary = await uploadImage(file);
        setData((prevData) => ({
            ...prevData,
            productImage: [...prevData.productImage, uploadImageCloudinary.url]
        }));
    };

    const handleDeleteProduct = (index) => {
        const newProductImage = [...data.productImage];
        newProductImage.splice(index, 1);
        setData((prevData) => ({
            ...prevData,
            productImage: newProductImage
        }));
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        const response  = await fetch('http://localhost:8080/api/productdata',{
            method:SummaryApi.productdata.method,
            credentials:'include',
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(data)
            

        })
        const responsedata = await response.json()
        if(responsedata.success){
            toast.success(responsedata.message)
            onClose()
            fetchData()

        
        }
        if(responsedata.error){
            toast.error(responsedata.error)
        }
    };

    return (
        <div className='fixed w-full  h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
            <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>
                <div className='flex justify-between items-center pb-3'>
                    <h2 className='font-bold'>Upload Product</h2>
                    <div className='ml-auto text-3xl'>
                        <button onClick={onClose}>
                            <IoClose />
                        </button>
                    </div>
                </div>
                <form className='grid p-4 gap-2 overflow-y-scroll h-full pb-5' onSubmit={handleSubmit}>
                    <label htmlFor='productName'>Item Name:</label>
                    <input
                        type='text'
                        placeholder='Enter the name of item'
                        id='productName'
                        value={data.productName}
                        onChange={handleOnChange}
                        name='productName'
                        className='p-2 bg-slate-100 border rounded'
                        required
                    />
                    <label htmlFor='brandName'>Brand Name:</label>
                    <input
                        type='text'
                        placeholder='Enter the Brand Name'
                        id='brandName'
                        value={data.brandName}
                        name='brandName'
                        onChange={handleOnChange}
                        className='p-2 bg-slate-100 border rounded'
                        required
                    />
                    <label htmlFor='category'>Category:</label>
                    <select
                        id='category'
                        value={data.category}
                        name='category'
                        onChange={handleOnChange}
                        className='p-2 bg-slate-100 border rounded'
                    >
                        <option value="">Select Category</option>
                        {productCategory.map((el, index) => (
                            <option value={el.value} key={el.value + index}>{el.label}</option>
                        ))}
                    </select>
                    <label htmlFor='itemimage'>Item Image:</label>
                    <label htmlFor='UploadImageItem'>
                        <div className='p-2 bg-slate-100 rounded h-50 w-full justify-center items-center cursor-pointer'>
                            <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
                                <IoMdCloudUpload className='text-4xl' />
                                <p className='text-sm'>Upload Item</p>
                                <input
                                    type='file'
                                    id='UploadImageItem'
                                    className='hidden'
                                    onChange={handleUploadProduct}
                                />
                            </div>
                        </div>
                    </label>
                    <div>
                        {data.productImage.length > 0 ? (
                            <div className='flex gap-2'>
                                {data.productImage.map((el, index) => (
                                    <div key={index} className='relative flex'>
                                        <img
                                            src={el}
                                            alt={`Product ${index + 1}`}
                                            width={80}
                                            height={100}
                                            className='bg-slate-100 border cursor-pointer'
                                            onClick={() => {
                                                setOpenFullscreenImage(true);
                                                setFullImage(el);
                                            }}
                                        />
                                        <span className='cursor-pointer' key={index}>
                                            <MdDelete onClick={() => handleDeleteProduct(index)} />
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>*Please Upload the Item Image</p>
                        )}
                    </div>
                    <label htmlFor='price' className='mt-3'>Price:</label>
                    <input
                        type='number'
                        id='price'
                        name='price'
                        value={data.price}
                        placeholder='Enter the price of the item'
                        onChange={handleOnChange}
                        className='p-2 bg-slate-200 border rounded mb-3'
                    />
                    <label htmlFor='sellingPrice' className='mt-1'>Selling Price:</label>
                    <input
                        type='number'
                        id='sellingPrice'
                        placeholder='Enter the Selling price of the item'
                        name='sellingPrice'
                        value={data.sellingPrice}
                        onChange={handleOnChange}
                        className='p-2 bg-slate-200 border rounded mb-3'
                    />
                    <label htmlFor='description' className='mt-3'>Description:</label>
                    <textarea
                        id='description'
                        name='description'
                        value={data.description}
                        onChange={handleOnChange}
                        className='h-28 bg-slate-100 border resize-none p-1'
                        rows={3}
                        placeholder='Enter the item description'
                    />
                    <button type='submit' className='px-3 py-2  bg-purple-400 rounded mb-10' >Upload Product</button>
                </form>
            </div>
            {openFullscreenImage && (
                <Displayimage onClose={() => setOpenFullscreenImage(false)} imageurl={fullImage} />
            )}
        </div>
    );
};

export default UploadProduct;

