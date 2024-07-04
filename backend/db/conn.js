const mongoose=require('mongoose');
// mongoose.connect('mongodb://127.0.0.1:27017/stationary',{
//     useNewUrlParser:true,
//     useUnifiedTopology:true
// }).then(()=>{
//     console.log('Db Connected');
// }).catch((error)=>{
//     console.log(error);
// });
// module.exports=mongoose;
// console.log("hello");
async function connectDB(){
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        
    } catch (err) {
        console.log(err)

        
    }
}
module.exports = connectDB