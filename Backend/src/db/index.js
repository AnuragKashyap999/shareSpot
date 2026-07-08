import mongoose from 'mongoose'
import "dotenv/config";
import DB_Name from '../constant.js'

const connectDB = async()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_Name}`)
        console.log("MongoDb Connected !! DB Host:",connectionInstance.connection.host)
    } catch (error) {
     console.log("MongoDB connection failed:",error)
     process.exit(1); 
    }
}

export default connectDB;
