import User from "../models/UserSchema.js";
import Booking from "../models/BookingSchema.js";
import Doctor from "../models/DoctorSchema.js";

export const updateUser = async (req, res) => {
  const id = req.params.id;
  try {
    const updateUser = await User.findByIdAndUpdate(id, { $set: req.body }, { new: true });
    res.status(200).json({ success: true, message: "Successfully updated", data: updateUser });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to update" });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Successfully deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to delete" });
  }
};

export const getSingleUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id).select("-password");
    res.status(200).json({ success: true, message: "User found", data: user });
  } catch (err) {
    res.status(400).json({ success: false, message: "Failed to find user" });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.status(200).json({ success: true, message: "Successfully found", data: users });
  } catch (err) {
    res.status(400).json({ success: false, message: "Not found" });
  }
};

export const getUserProfile = async (req, res) => {
  const userId = req.user?.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    const { password, ...rest } = user._doc;
    res.status(200).json({ success: true, message: "Profile info retrieved", data: { ...rest } });
  } catch (err) {
    res.status(500).json({ success: false, message: "Something went wrong, cannot get profile" });
  }
};

export const getMyAppointments = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id });
    const doctorIds = bookings.map((el) => el.doctor.id);
    const doctors = await Doctor.find({ _id: { $in: doctorIds } }).select("-password");
    res.status(200).json({ success: true, message: "Appointments retrieved", data: doctors });
  } catch (err) {
    res.status(500).json({ success: false, message: "Something went wrong, cannot get appointments" });
  }
};

export const getAllDrivers = async (req, res) => {
  try {
    const drivers = await User.find({ role: "driver" }).select("-password");
    res.status(200).json({ success: true, message: "Drivers found", data: drivers });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch drivers" });
  }
};