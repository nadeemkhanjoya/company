import bcrypt from "bcrypt"
import User from '../modals/users.modal.js'
import jwt from "jsonwebtoken"
export const Registration = async (req, res) => {
    try {
        const IsMobileExist = await User.findOne({ Phone_Number: req.body.Phone_Number })
        const IsEmailExist = await User.findOne({ Email_id: req.body.Email_id })
        if (IsMobileExist) {
            res.send({
                status: false,
                msg: "Phone Number already exist..",
                data: {}
            });
        } else if (IsEmailExist) {
            res.send({
                status: false,
                msg: "Email already exist.",
                data: {}
            });
        } else {
            const passwordHash = await bcrypt.hash(req.body.Password, 10)
            req.body.Password = passwordHash
            var user = await User.create(req.body);
            if (user) {
                user.token = await jwt.sign({ time: Date(), userId: user._id }, "unio_labs")
                res.send({
                    status: true,
                    msg: "Registration Successfully.",
                    data: user
                });
            }
        }

    } catch (error) {
        res.send(error)
    }
}

export const Login = async (req, res) => {
    try {

        const getUserData = await User.findOne({ Phone_Number: req.body.Phone_Number })
        if (getUserData) {
            const checkPass = await bcrypt.compare(req.body.Password, getUserData.Password)
            if (checkPass) {
                getUserData.token = await jwt.sign({ time: Date(), userId: getUserData._id }, "unio_labs")
                res.send({
                    status: true,
                    msg: "Login Succesfully",
                    data: getUserData
                })
            } else {
                res.send({
                    status: false,
                    msg: "Invalid Password given.",
                    data: {}
                })
            }
        } else {
            res.send({
                status: false,
                msg: "Phone_Number not found",
                data: {}
            })
        }

    } catch (error) {
        res.send(error)
    }
}

export const otp_send = async (req, res) => {
    var otp = Math.floor(1000 + Math.random() * 9000);
    req.body.otp = otp
    var findNumber = await User.findOneAndUpdate({ Phone_Number: req.body.Phone_Number }, req.body)
    findNumber.otp = req.body.otp
    if (findNumber) {
        res.send({
            status: true,
            msg: "otp send",
            data: findNumber
        })
    } else {
        res.send({
            status: false,
            msg: "otp sended faild",
            data: data
        })
    }
}

export const Forget_Password = async (req, res) => {
    try {
        var findUser = await User.findOne({ Phone_Number: req.body.Phone_Number, otp: req.body.otp })
        if (findUser) {
            var pass = await bcrypt.hash(req.body.Password, 10)
            req.body.Password = pass
            await User.findByIdAndUpdate({ _id: findUser._id }, req.body)
            res.send({
                status: true,
                msg: "chenged password Succesfully",
                data: findUser
            })
        } else {
            res.send({
                status: false,
                msg: "User not found",
                data: {}
            })
        }
    } catch (error) {
        res.send(error)
    }
}
export const Chenge_password = async (req, res) => {
    try {
        const checkUserExist = await User.findOne({ Phone_Number: req.body.Phone_Number })
        if (checkUserExist) {
            var checkPass = await bcrypt.compare(req.body.old_Password, checkUserExist.Password)
            if (checkPass) {
                var dataToBeUpdate = {}
                var passhash = await bcrypt.hash(req.body.new_Password, 10)
                dataToBeUpdate.Password = passhash
                await User.findByIdAndUpdate({ _id: checkUserExist._id }, dataToBeUpdate)
                res.send({
                    status: true,
                    msg: "Password Reset Succesfully",
                    data: checkUserExist
                })
            } else {
                res.send({
                    status: false,
                    msg: "Invalid Password given.",
                    data:{}
                })
            }
        } else {
            res.send({
                status: false,
                msg: "User not found",
                data:{}
            })
        }
    } catch (error) {
        res.send(error)
    }
}

export const Email_Verification = async (req, res) => {
    try {
        var findUser = await User.findOne({ Email_id: req.body.Email_id })
        if (findUser) {
            var Emaildata = {}
            Emaildata.Email_Verification = true
            await User.findByIdAndUpdate({ _id: findUser._id }, Emaildata)
            findUser.Email_Verification = true
            res.send({
                status: true,
                msg: "verifiction dane",
                data: findUser
            })

        } else {
            res.send({
                status: false,
                msg: "User not found",
                data: {}
            })
        }
    } catch (error) {
        res.send(error)
    }
}

