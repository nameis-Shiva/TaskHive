const otpModel = require("../models/otpModel");
const userModel = require("../models/userModel");
const generateOtp = require("../utils/otp");
const {sendOtpMail} = require("../utils/nodemailer.js")


const forgetPassword = async () => {
    try {
        const {email} = req.body;
        const response = await userModel.findOne({email});
        if(response){
            const otp = generateOtp();
            const isUser = await otpModel.findOne({email});
            if(isUser){
                let lastUpdated = isUser.updatedAt.getTime()  // this converts the time into milliseconds value
                let currentTime = new Date().getTime()
                if(currentTime - lastUpdated > 30000){
                    await otpModel.updateOne({email},{$set:{otp}})
                    await sendOtpMail(email,otp)
                } else{
                    return res.status(400).send({error: "Wait for 30sec before generating the OTP again"})
                }
            }else{
                let otpData = new otpModel({email,otp})
                await otpData.save();
                await sendOtpMail(email,otp)
            }
        }else{
            return res.status(400).send({error:"User is not registered"})
        }
    } catch (error) {
        return res.status(500).send({error:"Internal Server Error", msg:error.message})
    }
}

const verifyOtp = async () => {
    try {
        const {email,otp} = req.body;
        const otpData = await otpModel.aggregate([{$match:{email}} ,{
            $lookup:{
                from:"users",
                localField:"email",
                foreignField:"email",
                as:"userDetails"
            }
        }])
        otpData = otpData[0]
    
        if(otpData){
            let lastUpdated = isUser.updatedAt.getTime()
            let currentTime = new Date().getTime()
            let fiveMin = 1000 * 60 * 5;
            if(currentTime - lastUpdated <= fiveMin ){  
                if(otpData == otp){
                    return res.status(200).send({message: "OTP is Verified"})
                }else{
                    return res.status(400).send({message: "OTP is not matched"})
                }
            }else{
                return res.status(400).send({error:"OTP is expired generate again..!"})
            }
        }else{
            return res.status(400).send({error:"OTP is not generated for the email address"})
        }
    } catch (error) {
        return res.status(500).send({error: "Internal Server Error", msg: error.message})
    }
}

const changePassword = async () => {
    try {
        const {id} = req;
        const {newPassword} = req.body
        let hasedPassword = await createHashPassword(newPassword)
        await userModel.findByIdAndUpdate(id,{$set:{password:hasedPassword}})
        return res.status(201).send({message:"User Password Updated"})
    } catch (error) {
        return res.status(500).send({error:"Internal Server Error", msg:error.message})
    }
}

module.exports = {forgetPassword, verifyOtp, changePassword}