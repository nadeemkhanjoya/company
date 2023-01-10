import mongoose from "mongoose";
const connectDB = async()=>{
    const connect = await mongoose.connect("mongodb://localhost:27017/test")
        console.log("Host----", connect.connection.host);
}
export default connectDB