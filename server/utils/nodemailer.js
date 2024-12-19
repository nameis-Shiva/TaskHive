const nodemailer = require("nodemailer");
const { config } = require("dotenv");
config();

const transport = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.EMAIL_ADD,
        pass:process.env.EMAIL_PASS
    }
})

const sendOtpMail = async (to,otp) =>{
    try {
        const mailOption = {
            from:process.env.EMAIL_ADD,
            to,
            subject:"OTP for TaskHive",
            text:`Here is the OTP for your TaskHive is ${otp}, It will expire in 5 minutes.  Don't share your OTP.`
        }
        await transport.sendMail(mailOption)
    } catch (error) {
        return new Error("Error while sending Mail"+error.message)
    }
}

module.exports = sendOtpMail;