import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import AuthRoute from "./Routes/auth.js";
import UserRoute from "./Routes/user.js";
import doctorRoute from "./Routes/doctor.js";
import reviewRoute from "./Routes/review.js";
import bookingRoute from "./Routes/booking.js";
import emailRoute from "./Routes/email.js";
import ambulanceRoute from "./Routes/ambulance.js";
import driverRoutes from './Routes/driverRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

const corsOptions = {
  origin: true,
};

app.get("/", (req, res) => {
  res.send("API is running");
});

// Database connection
mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB database is connected");
  } catch (err) {
    console.log("❌ MongoDB database connection failed:", err);
  }
};

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

// Routes
app.use("/api/v1/auth", AuthRoute);
app.use("/api/v1/users", UserRoute);
app.use("/api/v1/doctors", doctorRoute);
app.use('/api/v1/drivers', driverRoutes);
app.use("/api/v1/reviews", reviewRoute);
app.use("/api/v1/bookings", bookingRoute);
app.use("/api/v1/email", emailRoute);
app.use("/api/v1/ambulance", ambulanceRoute);

app.listen(port, () => {
  connectDB();
  console.log(`🚀 Server is running on port ${port}`);
});