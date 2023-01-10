import mongoose from "mongoose";
const UserShema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Phone_Number: {
        type: Number,
        required: true
    },
    Email_id: {
        type: String,
        required: true
    },
    Address: {
        type: String,
        required: false
    },
    Password: {
        type: String,
        required: true
    },
    otp:{
        type:Number,
        required:false
    },
    Email_Verification:{
        type:Boolean,
      default : false
    },
    status: {
        type: String,
        enum: ["Active", "Deactive"],
        default: "Active"
    },
    token:{
        type:String,
        required:false
    }
}, { timestamps: true })

const User = mongoose.model("Users", UserShema)
export default User