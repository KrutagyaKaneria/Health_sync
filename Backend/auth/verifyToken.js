import jwt from 'jsonwebtoken'
import Doctor from '../models/DoctorSchema.js'
import User from '../models/UserSchema.js'

export const authenticate = async (req, res, next) => {
    // Get token from Headers
    const authToken = req.headers.authorization;
    console.log("🔹 Received Auth Header:", authToken); // Log incoming auth header

    // Check if token exists
    if (!authToken || !authToken.startsWith('Bearer ')) {
        console.log("❌ No token found or invalid format");
        return res.status(401).json({ success: false, message: 'No token, authorization denied' });
    }

    try {
        const token = authToken.split(" ")[1];
        console.log("🔹 Extracted Token:", token); // Log the extracted token

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log("✅ Decoded Token:", decoded); // Log decoded payload

        // Check if decoded token contains id
        if (!decoded.id) {
            console.log("❌ Token does not contain a user ID");
            return res.status(401).json({ success: false, message: "Invalid token" });
        }

        // Attach user info to request
        req.user = { id: decoded.id, role: decoded.role };
        console.log("🔹 User attached to request:", req.user);

        next();
    } catch (err) {
        console.error("❌ Error verifying token:", err);

        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, message: "Token is expired" });
        }

        return res.status(401).json({ success: false, message: "Invalid token" });
    }
};



export const restrict = (roles) => async (req, res, next) => {
    console.log("🚀 restrict middleware is running");
    console.log("🔹 req.user:", req.user);

    if (!req.user) {
        console.log("❌ req.user is undefined in restrict middleware");
        return res.status(401).json({ success: false, message: "Unauthorized: No user found" });
    }

    const userId = req.user.id;
    console.log("User ID from Token:", userId);

    try {
        const patient = await User.findById(userId);
        console.log("🩺 Patient Found:", patient);

        const doctor = await Doctor.findById(userId);
        console.log("🩺 Doctor Found:", doctor);

        let user;
        if (patient) user = patient;
        if (doctor) user = doctor;

        if (!user) {
            console.log("❌ No user found in database for ID:", userId);
            return res.status(401).json({ success: false, message: "User not found" });
        }

        if (!roles.includes(user.role)) {
            console.log("❌ User role not authorized:", user.role);
            return res.status(403).json({ success: false, message: "You are not authorized" });
        }

        next();
    } catch (err) {
        console.error("❌ Error in restrict middleware:", err);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};




