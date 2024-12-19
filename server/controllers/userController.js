const userModel = require("../models/userModel.js");
const { createHashPassword, comparePassword } = require("../utils/bcrypt.js");
const { generateToken } = require("../utils/jwt.js");

const userSignUp = async (req, res) => {
    try {
        const user = req.body;
        const { firstName, lastName, dob, gender, email, password } = user;
        if (firstName && email && password) {
            // Check if user already exists
            const existingUser = await userModel.findOne({ email });
            if (existingUser)
                return res
                    .status(400)
                    .json({ error: "User already exists with this email. Please Login!" });

            // For new users
            let hashedPassword = await createHashPassword(password);
            let newUser = new userModel({
                ...user,
                password: hashedPassword,
            });

            await newUser.save();

            //Generate Token
            const token = generateToken(newUser._id);

            // Respond with success
            return res.status(201).json({
                message: "User Signed Up Successfully",
                userId: newUser._id,
                token: token
            });
        } else {
            return res.status(400).json({
                error: "Firstname, email, and password are mandatory to Sign Up with TaskHive",
            });
        }
    } catch (error) {
        res.status(500).send({
            error: "Internal Server Error",
            msg: error.message,
        });
    }
};

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email && password) {
            const user = await userModel.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: "You are not registered, Please Signup" })
            } else {
                //Verify password
                const isVerified = await comparePassword(password, user.password)
                if (!isVerified) {
                    return res.status(400).json({ message: "Mail or Password not matched" });
                } else {
                    // Update lastLogin and save user
                    user.lastLogin = new Date();
                    await user.save();

                    //Generate Token
                    const token = generateToken(user._id);

                    return res.status(200).json({
                        message: "Login successful",
                        userId: user._id,
                        token: token,
                        lastLogin: user.lastLogin
                    });
                }
            }
        } else {
            return res.status(400).json({ message: "Provide Email and Password" })
        }

    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error", msg: error.message });
    }
}

const getUser = async (req, res) => {
    try {
        const id = req.userId;
        const user = await userModel.findById(id);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Respond with the user details
        return res.status(200).json({ message: "User details retrieved successfully", user });

    } catch (error) {
        return res.status(500).send({ error: "Internal Server Error", msg: error.message });
    }
};

const updateUser = async (req,res) => {
    try {
        const userId = req.userId;
        const updateData=req.body;

        // Disallow sensitive fields
        delete updateData.password;
        delete updateData.email;

        const allowedUpdates = ["firstName","lastName","dob","gender"];
        const filteredData = {};

        allowedUpdates.forEach((field) => {
            if (updateData.hasOwnProperty(field)) {
                filteredData[field] = updateData[field];
            }
        });
        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { $set: filteredData },
            { new: true, runValidators: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).json({
            message: "User data updated successfully",
            user: updatedUser,
        });        

    } catch (error) {
        return res.status(500).json({error:"Internal Server Error ",msg:error.message});
    }
}

const deleteUser = async (req,res) => {
    try {
        const userId = req.userId;
        const user = await userModel.findById(userId);
        if(!user){
            return res.status(404).json({error:"User not found"});
        }

        await userModel.findByIdAndDelete(userId);
        return res.status(200).json({message:"User Deleted Successfully"})
    } catch (error) {
        return res.status(500).json({error:"Internal Server Error",msg:error.message});
    }
}

module.exports = { userSignUp, userLogin, getUser, updateUser, deleteUser };