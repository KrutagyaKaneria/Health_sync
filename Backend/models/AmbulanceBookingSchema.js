import mongoose from "mongoose";

const AmbulanceBookingSchema = new mongoose.Schema({
  patientId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  pickupAddress: { type: String, required: true },
  destination: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "running", "completed"],
    default: "pending",
  },
  driverId: { type: mongoose.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("AmbulanceBooking", AmbulanceBookingSchema);