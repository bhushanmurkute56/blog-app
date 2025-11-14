import User from "./../models/User.js";

const postSignup = async(req, res) => {
    const {name, email, password} = req.body;

    const emailValidationRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const nameValidationRegex = /^[a-zA-Z ]+$/;
    const passwordValidationRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if(!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields are required",
        })
    }

    if(nameValidationRegex.test(name) === false) {
        return res.status(400).json({
            success: false,
            message: "Name is required",
        })
    }

    if(emailValidationRegex.test(email) === false) {
        return res.status(400).json({
            success: false,
            message: "Email is not valid",
        })
    }

    if(passwordValidationRegex.test(password) === false) {
        return res.status(400).json({
            success: false,
            message: "Password is required",
        })
    }

    const existingUser = await User.findOne({email});
    if(existingUser) {
        return res.status(400).json({
            success: false,
            message: `Use with this email ${email} already exists`,
        })
    }

    const newUser = new User({name, email, password});

    const savedUser = await newUser.save();

    res.json({
        success: true,
        message: "User registered successfully",
        user: savedUser,
    })
};

const postLogin = async(req, res) => {
    const {email, password} = req.body;

    if(!email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields are required",
        })
    }

    const existingUser = await User.findOne({email, password});

    if(existingUser) {
        return res.json({
            success: true,
            message: "User logged in successfully",
            user: existingUser,
        })
    } else {
        return res.status(400).json({
            success: false,
            message: "Invalid credentials",
        })
    }
};

export {postSignup, postLogin};