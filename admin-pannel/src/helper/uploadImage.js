const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME_CLOUNDINARY}/image/upload`
const uploadImage = async(image)=>{
    const formData = new FormData()
    formData.append("file" , image)
    formData.append("upload_preset" , "Stationary_Images")
    const dataresponse =await fetch(url,{
        method:"post",
        body:formData
    })
    return dataresponse.json()

}
export default uploadImage