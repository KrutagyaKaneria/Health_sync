import User from "../models/UserSchema.js";
import Booking from "../models/BookingSchema.js";
import Doctor from "../models/DoctorSchema.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register a new user
export const registerUser = async (req, res) => {
  const { email, password, name, role, licenseNumber, ambulanceNumber, photo, gender, phone, bloodType } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      email,
      password: hashedPassword,
      name,
      role,
      licenseNumber: role === 'driver' ? licenseNumber : undefined,
      ambulanceNumber: role === 'driver' ? ambulanceNumber : undefined,
      photo,
      gender,
      phone,
      bloodType,
    });

    await user.save();
    res.status(201).json({ success: true, message: 'User registered successfully' });
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '15d' }
    );

    res.status(200).json({
      success: true,
      token,
      userId: user._id,
      role: user.role,
      data: { name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error('Error logging in:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Update user
export const updateUser = async (req, res) => {
  const id = req.params.id;
  try {
    const updateUser = await User.findByIdAndUpdate(id, { $set: req.body }, { new: true });
    res.status(200).json({ success: true, message: "Successfully updated", data: updateUser });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to update" });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Successfully deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to delete" });
  }
};

// Get single user
export const getSingleUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id).select("-password");
    res.status(200).json({ success: true, message: "User found", data: user });
  } catch (err) {
    res.status(400).json({ success: false, message: "Failed to find user" });
  }
};

// Get all users
export const getAllUser = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.status(200).json({ success: true, message: "Successfully found", data: users });
  } catch (err) {
    res.status(400).json({ success: false, message: "Not found" });
  }
};

// Get authenticated user's profile (renamed from getMyProfile to match your code)
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

// Get user's appointments
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

// Get all drivers
export const getAllDrivers = async (req, res) => {
  try {
    const drivers = await User.find({ role: "driver" }).select("-password");
    res.status(200).json({ success: true, message: "Drivers found", data: drivers });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch drivers" });
  }
};