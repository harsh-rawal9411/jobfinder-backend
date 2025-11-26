import User from "../models/User.js";
import bcrypt, { compare } from "bcryptjs";
import jwt from "jsonwebtoken";


export const register = async (req, res) => {
    try {
        const {name, email, password, role} = req.body;

        // check if user exist
        const userExist = await User.findOne({email});
        if (userExist) {
            return res.status(400).json({message: "Email already registered"});
        }

        const hashpassword = await bcrypt.hash(password, 10);
        
        // create user

        const user = await User.create({
            name,
            email,
            password: hashpassword,
            role
        });

        res.status(201).json({message: "User created successfully", user});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "server failed to create user "})
    }
};


export const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        // find user
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({message: "Invalid email or passwprd"})
        }

        // compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
             return res.status(400).json({message: "Invalid email or passwprd"})
        }

        // create token
        const token = jwt.sign(
            {id: user._id, role: user.role},
            process.env.JWT_SECRET,
            {expiresIn: "7d"}
        );

         res.json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "server failed to create user "})
    }
}