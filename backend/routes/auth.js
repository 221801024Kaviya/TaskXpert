const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../models/User"); // Ensure correct path
require("dotenv").config();

router.post("/forgot-password", async (req, res) => {
    try {
        console.log("🔹 Forgot Password Request Received:", req.body);

        const { email } = req.body;
        if (!email) {
            console.log("❌ Email is missing in the request");
            return res.status(400).json({ message: "Email is required" });
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            console.log("❌ User not found for email:", email);
            return res.status(400).json({ message: "User with this email does not exist" });
        }

        // Generate Reset Token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "15m" });

        console.log("🔹 Generated Reset Token:", token);

        // Create Nodemailer Transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        console.log("🔹 Email Transporter Created");

        // Email Content
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Password Reset Request",
            html: `<p>Click the link below to reset your password:</p>
                   <a href="${process.env.FRONTEND_URL}/reset-password/${token}">Reset Password</a>
                   <p>This link expires in 15 minutes.</p>`
        };

        console.log("🔹 Sending Email to:", email);

        // Send Email
        const info = await transporter.sendMail(mailOptions);
        console.log("✅ Email sent successfully:", info.response);

        res.json({ message: "Password reset link sent! Check your email." });

    } catch (error) {
        console.error("❌ Forgot Password Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});


// ✅ Reset Password - Verify Token and Update Password

router.post("/reset-password/:token", async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        console.log("🔹 Reset Password Request Received: Token:", token);
        console.log("🔹 New Password:", password);

        if (!password) {
            return res.status(400).json({ message: "Password is required!" });
        }

        const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });

        if (!user) {
            console.log("❌ Invalid or Expired Token");
            return res.status(400).json({ message: "Invalid or expired token!" });
        }

        user.password = await bcrypt.hash(password, 10);
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;

        await user.save();
        console.log("✅ Password Reset Successfully!");

        res.json({ message: "Password reset successful!" });
    } catch (error) {
        console.error("❌ Reset Password Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});


// ✅ SIGN-UP ROUTE
router.post("/signup", async (req, res) => {
    try {
        console.log("🔹 Signup Request Received:", req.body);

        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            console.log("❌ Missing Fields!");
            return res.status(400).json({ message: "All fields are required!" });
        }

        let user = await User.findOne({ email });
        if (user) {
            console.log("❌ User Already Exists!");
            return res.status(400).json({ message: "User already exists!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("🔹 Hashed Password:", hashedPassword);

        user = new User({ name, email, password: hashedPassword });

        console.log("🔹 Saving User:", user);
        await user.save();
        console.log("✅ User Created:", user);

        res.status(201).json({ message: "Signup successful!", user });

    } catch (error) {
        console.error("❌ Signup Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});


// ✅ SIGN-IN ROUTE
router.post("/signin", async (req, res) => {
    try {
        console.log("🔹 Sign-in Request Received:", req.body);

        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({
            message: "Sign-in successful",
            user: { _id: user._id, name: user.name, email: user.email },
            token
        });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// router.post("/forgot-password", async (req, res) => {
//     try {
//         console.log("🔹 Forgot Password Route Hit");
//         console.log("Request Body:", req.body);

//         const { email, newPassword } = req.body;

//         // ✅ Check if email and newPassword exist
//         if (!email || !newPassword) {
//             console.log("❌ Missing Fields", { email, newPassword });
//             return res.status(400).json({ message: "Email and new password are required" });
//         }

//         // ✅ Find user in DB
//         const user = await User.findOne({ email });
//         if (!user) {
//             console.log("❌ User Not Found:", email);
//             return res.status(400).json({ message: "User not found" });
//         }

//         console.log("🔹 User Found:", user.email);

//         // ✅ Ensure newPassword is a valid string before hashing
//         if (typeof newPassword !== "string" || newPassword.trim() === "") {
//             console.log("❌ Invalid newPassword:", newPassword);
//             return res.status(400).json({ message: "New password must be a valid string" });
//         }

//         // ✅ Hash the new password
//         const hashedPassword = await bcrypt.hash(newPassword, 10);
//         console.log("🔹 Hashed Password Generated");

//         // ✅ Update password in database
//         user.password = hashedPassword;
//         await user.save();
//         console.log("✅ Password Updated Successfully");

//         res.status(200).json({ message: "Password reset successful" });

//     } catch (error) {
//         console.error("❌ Forgot Password Error:", error);
//         res.status(500).json({ message: "Server error", error: error.message });
//     }
// });


module.exports = router;
