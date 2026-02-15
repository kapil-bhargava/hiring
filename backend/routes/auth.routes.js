const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Signup = require("../models/signup");

/**
 * ===============================
 * SIGNUP ROUTE
 * ===============================
 * - Creates a new user
 * - Hashes password using bcrypt
 */
router.post("/signup", async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;

        // 1️⃣ Basic validation
        if (!name || !email || !password || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // 2️⃣ Check if email already exists
        const existingUser = await Signup.findOne({ email });
        if (existingUser) {
            return res.json({
                success: false,
                message: email + " Email already registered",
            });
        }

        // 3️⃣ Password confirmation check
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match",
            });
        }

        // 4️⃣ Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 5️⃣ Save user
        const user = await Signup.create({
            name,
            email,
            password: hashedPassword,
        });

        res.status(201).json({
            success: true,
            message: "Signup successful",
            userId: user._id,
        });
    } catch (error) {
        console.error("Signup error:", error);
        res.json({
            success: false,
            message: error.message,
        });
    }
});

/**
 * ===============================
 * LOGIN ROUTE
 * ===============================
 * - Verifies email and password
 */
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1️⃣ Basic validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }
        // return console.log(typeof password)
        if (typeof password !== "string") {
            return res.json({
                success: false,
                message: "Password must be a string",
            });
        }

        // 2️⃣ Check if user exists
        const user = await Signup.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // 3️⃣ Compare password with hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({
                success: false,
                message: "Invalid credentials",
            });
        }

        // 4️⃣ Successful login
        res.status(200).json({
            success: true,
            message: "Login successful",
            user:user
        });
    } catch (error) {
        console.error("Login error:", error);
        res.json({
            success: false,
            message: error.message,
        });
    }
});


// getting all applicants counts 
router.get("/users/count", async (req, res) => {
    try{
        let users = await Signup.find()
        res.json({count:users.length})
    }catch(err){
        res.json({message:err.message})
    }
})

module.exports = router;