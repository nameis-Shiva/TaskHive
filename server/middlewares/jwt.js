const jwt = require("jsonwebtoken")
const {config} = require("dotenv")
config();

const verifyToken = (req,res,next) => {
        try {
            const token = req.headers.authorization?.split(" ")[1];
            if(!token){
                return res.status(400).json({error:"Access Denied. No token provided"});
            }

            //verify token
            const decoded = jwt.verify(token,process.env.JWT_SECRET);
            req.userId = decoded.userId;
            next();
        } catch (error) {
            return res.status(400).json({error:"Invalid or Expired Token"})
        }
}

module.exports = verifyToken;