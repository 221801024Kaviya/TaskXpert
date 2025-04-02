// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// require("dotenv").config();

// const app = express();

// // Middleware
// app.use(express.json());
// app.use(cors());

// // Database Connection
// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
// .then(() => console.log("✅ MongoDB Connected"))
// .catch(err => console.error("❌ MongoDB Connection Error:", err));


// // ✅ Import Routes
// const authRoutes = require("./routes/auth");

// // ✅ Register Routes
// app.use("/api", authRoutes);

// // Start Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
require("dotenv").config();  // ✅ Load environment variables at the top

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");
const nodemailer = require("nodemailer");
const authRoutes = require("./routes/auth");

const app = express();
app.use(express.json());
app.use(cors());

const COLAB_API_URL = process.env.COLAB_API_URL || "https://abab-35-240-130-250.ngrok-free.app"; // ✅ Use env variable

// ✅ Register auth routes
app.use("/api", authRoutes);

// ✅ Test Route (Ensure the server is running)
app.get("/", (req, res) => {
    res.send("✅ Server is running!");
});

// ✅ Route to generate email content
app.post("/generate-email", async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: "Prompt is required" });
        }

        const response = await axios.post(`${COLAB_API_URL}/generate-email`, { prompt }, { 
            headers: { "Content-Type": "application/json" }
        });

        res.json({ subject: response.data.subject, message: response.data.message });
    } catch (error) {
        console.error("❌ Error in /generate-email:", error.response?.data || error.message);
        res.status(500).json({ error: "Error generating email content" });
    }
});

// ✅ Route to send email
app.post("/send-email", async (req, res) => {
    const { to, from, subject, message } = req.body;

    if (!to || !from || !subject || !message) {
        return res.status(400).json({ error: "All email fields are required" });
    }

    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    let mailOptions = {
        from: from,
        to: to,
        subject: subject,
        text: message
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: "Email sent successfully!" });
    } catch (error) {
        console.error("❌ Error sending email:", error.message);
        res.status(500).json({ error: "Error sending email" });
    }
});

// ✅ Validate MongoDB URI before connecting
if (!process.env.MONGO_URI) {
    console.error("❌ MONGO_URI is missing in .env file");
    process.exit(1);
}

// ✅ Connect to MongoDB and Start Server
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("✅ MongoDB Connected");
        const PORT = process.env.PORT || 5002;
        const server = app.listen(PORT, () => {
            console.log(`✅ Server running on port ${server.address().port}`);
        });

        server.on("error", (err) => {
            if (err.code === "EADDRINUSE") {
                console.log(`❌ Port ${PORT} is in use. Trying another port..."`);
                const newServer = app.listen(0, () => {
                    console.log(`✅ Server running on port ${newServer.address().port}`);
                });
            } else {
                console.error("❌ Server Error:", err);
            }
        });
    })
    .catch(err => console.error("❌ MongoDB Connection Error:", err));
