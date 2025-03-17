import mongoose from "mongoose";

const AmbulanceSchema = new mongoose.Schema({
  type: { type: String, required: true, enum: ["basic", "advanced", "emergency"] },
  status: { type: String, enum: ["available", "busy"], default: "available" },
  location: { type: String }, // Could use GeoJSON for precise coordinates
  driverId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
});

export default mongoose.model("Ambulance", AmbulanceSchema);