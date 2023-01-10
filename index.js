import express from "express"
import connectDB from "./config/db.js"
import User_router from "./routes/user.route.js"
const app = express()
connectDB()
app.use(express.json())
app.use(User_router)
app.listen(6000,(req,res)=>{
    console.log("server on");
})
