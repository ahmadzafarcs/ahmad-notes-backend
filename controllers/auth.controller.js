import jwt from "jsonwebtoken";
import User from "../models/auth.model.js";

export async function register(req, res) {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required" });
        }

        const isUserExists = await User.findOne({ email });

        if (isUserExists) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        const newUser = await User.create({ email, password });

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET );

        return res.status(201).json({success: true, data: { ...newUser._doc, accessToken: token }});

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ success: false, message: "User not found! Register now" });
        }

        if (user.password !== password) {
            return res.status(401).json({ success: false, message: "Invalid password" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET );

        return res.status(200).json({ success: true, data: { ...user._doc, accessToken: token } });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}