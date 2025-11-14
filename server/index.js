import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { postLogin, postSignup } from "./Controllers/user.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL);
        if (conn) {
            console.log("MongoDB connected");
        }
    }
    catch (error) {
        console.error("MongoDB connection error:", error)
    }
}

// app.use((req, res) => {})

app.get("/health", (req, res) => {
    res.json({
        success: true,
        message: "Server is up and running...",
    })
})

app.post("/signup", postSignup);
app.post("/login", postLogin);

const checkHeaderKey = (req, res, next) => {
    const {api_token} = req.headers;
    console.log("Checking API Token:", api_token);

    if(api_token == "admin") {
        console.log("Api Token is valid");
        next();
    }
    else {
        console.log("Api Token is invalid");
        res.status(401).json({message : "Unauthorized"});
    }
};

app.use(checkHeaderKey);

app.get("/api/test1",
    (req, res) => {
        console.log("Actual Controller Test 1");
        res.json({
            message: "Test 1 Route Reached Successfully!"
        });
    },
)

app.get("/api/test2",
    (req, res) => {
        console.log("Actual Controller Test 2");
        res.json({
            message: "Test 2 Route Reached Successfully!"
        });
    },
)

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on PORT : ${PORT}`);
    connectDB();
});