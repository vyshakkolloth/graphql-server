const mongoose = require('mongoose')


const connectDB= async()=>{
    const conn = await mongoose.connect(process.env.MONGODB)
    console.log(`MOgo is conn ${conn}`.cyan.underline);
}

module.exports=connectDB