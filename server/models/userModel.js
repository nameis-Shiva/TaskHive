const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,
        minLength:3
    },
    lastName:{
        type:String,
        trim:true
    },
    dob: {
        type: String 
    },
    gender: { 
        type: String, 
        enum: ["male", "female", "others"] 
    },
    email: { 
        type: String,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        required: true, 
        unique: true 
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [8, "Password must be at least 8 characters"]
    },
    lastLogin: {
        type: Date,
        default: null // Sets the initial value to null on user creation
    }    
    
}, {
    timestamps: true // Automatically add createdAt and updatedAt fields
});

const userModel = mongoose.model("users",userSchema);

module.exports = userModel;