require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ Serve Static Frontend Files & Root Route
app.use(express.static(path.join(__dirname)));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
app.get(['/login', '/api/login'], (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});
app.get(['/signup', '/api/signup'], (req, res) => {
    res.sendFile(path.join(__dirname, 'signup.html'));
});

// ✅ MongoDB Connection (Optional for Phase 1 prototype)
if (process.env.MONGO_URI) {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => console.log("✅ Connected to MongoDB"))
      .catch(err => console.error("❌ MongoDB Connection Error:", err));
} else {
    console.log("ℹ️ MONGO_URI not provided. Phase 1 frontend prototype operates without MongoDB.");
}

// ✅ User Schema & Model
const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    phone: { type: String, unique: true },
    password: String
});

const User = mongoose.model("User", userSchema);

// ✅ Signup Route
app.post(['/signup', '/api/signup'], async (req, res) => {
    const { name, email, phone, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
        return res.json({ success: false, message: "User already exists!" });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = new User({ name, email, phone, password: hashedPassword });
    await newUser.save();

    res.json({ success: true, message: "Account created successfully! Redirecting to login..." });
});

// ✅ Login Route
app.post(['/login', '/api/login'], async (req, res) => {
    const { emailPhone, password } = req.body;

    // Find user by email or phone
    const user = await User.findOne({ $or: [{ email: emailPhone }, { phone: emailPhone }] });
    if (!user) {
        return res.json({ success: false, message: "User not found!" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.json({ success: false, message: "Invalid password!" });
    }

    res.json({ success: true, message: "Login successful!" });
});

// ✅ Twilio OTP Setup (Optional for Phase 1 prototype)
let client = null;
if (process.env.TWILIO_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_PHONE) {
    try {
        client = new twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
        console.log("✅ Twilio client initialized.");
    } catch (err) {
        console.warn("⚠️ Failed to initialize Twilio client:", err.message);
    }
} else {
    console.log("ℹ️ Twilio credentials not provided. Phase 1 frontend prototype operates without Twilio.");
}

const otpStorage = {}; // Temporary OTP storage

// ✅ Route to send OTP
app.post(['/send-otp', '/api/send-otp'], async (req, res) => {
    let { emailPhone } = req.body;

    if (!client) {
        return res.json({ success: false, message: "Twilio credentials are not configured on the server." });
    }

    if (!emailPhone) {
        return res.json({ success: false, message: "❌ Phone number is required." });
    }

    // Ensure phone number is in correct format (+91XXXXXXXXXX)
    if (!emailPhone.startsWith("+91")) {
        emailPhone = `+91${emailPhone}`;
    }

    let otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStorage[emailPhone] = otp;

    try {
        let message = await client.messages.create({
            body: `Your OTP is ${otp}. It is valid for 5 minutes.`,
            from: process.env.TWILIO_PHONE,
            to: emailPhone
        });

        console.log("✅ Message Sent:", message.sid);
        res.json({ success: true, message: `OTP sent to ${emailPhone}` });
    } catch (error) {
        console.error("❌ Twilio Error:", error);
        res.json({ success: false, message: `Failed to send OTP. Error: ${error.message}` });
    }
});

// ✅ Route to verify OTP
app.post(['/verify-otp', '/api/verify-otp'], (req, res) => {
    const { emailPhone, otp } = req.body;

    if (!otpStorage[emailPhone] || otpStorage[emailPhone] !== otp) {
        return res.json({ success: false, message: "❌ Invalid or expired OTP." });
    }

    delete otpStorage[emailPhone]; // Remove OTP after verification
    console.log(`✅ OTP verified for ${emailPhone}`);
    res.json({ success: true, message: "✅ OTP verified successfully!" });
});

// ✅ Start Server (only when run directly via node server.js)
if (require.main === module) {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}

// ✅ Export Express app for Vercel Serverless Function
module.exports = app;
