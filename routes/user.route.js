import express from "express";
import { Chenge_password, Email_Verification, Forget_Password, Login, otp_send, Registration} from "../controllers/User.controller.js";
const User_router = express.Router()
User_router.route("/user/Registration").post(Registration)
User_router.route("/user/Login").post(Login)
User_router.route("/user/Chenge_password").put(Chenge_password)
User_router.route("/user/Email_Verification").post(Email_Verification)
User_router.route("/user/otp_send").post(otp_send)
User_router.route("/user/forget_password").post(Forget_Password)

export default User_router