import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: Number },
  photo: { type: String },
  role: {
    type: String,
    enum: ["patient", "admin", "driver"], // Added "driver" role
    default: "patient",
  },
  gender: { type: String, enum: ["male", "female", "other"] },
  bloodType: { type: String },
  appointments: [{ type: mongoose.Types.ObjectId, ref: "Appointment" }],
  licenseNumber: { type: String, required: function () { return this.role === "driver"; } }, // Driver-specific field
  ambulanceId: { type: mongoose.Types.ObjectId, ref: "Ambulance", required: function () { return this.role === "driver"; } }, // Link to ambulance
});

export default mongoose.model("User", UserSchema);