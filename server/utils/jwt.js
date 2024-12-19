const jwt = require("jsonwebtoken");
const {config} = require("dotenv");
config();

const generateToken = (data) => {
    try {
        const secretKey = process.env.JWT_SECRET;
        if (!secretKey) {
            throw new Error("JWT_SECRET is not defined in environment variables.");
        }
        const token = jwt.sign({userId:data}, secretKey);
        return token;
    } catch (error) {
        throw new Error("Error in JWT conversion: " + error.message);
    }
};

module.exports = { generateToken };  