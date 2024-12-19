const express = require("express");
const { userSignUp, userLogin, getUser, updateUser, deleteUser } = require("../controllers/userController");
const verifyToken = require("../middlewares/jwt");
const { changePassword, verifyOtp, forgetPassword } = require("../controllers/otpController");

const userRouter = express.Router();

//demo
userRouter.get("/", (req,res)=> res.send("userRouter Working"));

//signup
userRouter.post("/signup",userSignUp)
//login
userRouter.post("/login",userLogin)
//Fetch User Details
userRouter.get("/getuser",verifyToken, getUser)
//Update user Details
userRouter.put("/updateuser",verifyToken, updateUser)
//Delete User
userRouter.delete("/deleteuser",verifyToken, deleteUser)
//forget password
userRouter.post('/password',forgetPassword)
//Verify OTP
userRouter.post('/otp/verify',verifyOtp)
//Change Password
userRouter.patch('/change/pass',verifyToken,changePassword)

module.exports = userRouter