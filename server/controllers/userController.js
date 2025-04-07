import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
}

//Register
const register = async (req, res) => {
    const { name, email, password, phone } = req.body;
    try {
        const exists = await userModel.findOne({ email });
        //Checking user already exist
        if (exists) {
            return res.status(400).json({ message: "User already exists" });
        }

        //Validate email
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Enter a valid email" });
        }

        if (password.length < 8) {
            return res.status(400).json({ message: "Password should be at least 8 characters" });
        }

        //Validate phone number
        if (!validator.isMobilePhone(phone)) {
            return res.status(400).json({ message: "Enter a valid phone number" });
        }

        //Hashing password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword,
            phone: phone
        })
        const user = await newUser.save()
        const token = createToken(user._id)
        res.status(201).json({ message: "User created successfully", token: token });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}


//Login
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const token = createToken(user._id);
        res.status(200).json({ message: "Logged in successfully", token: token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export { register, login }