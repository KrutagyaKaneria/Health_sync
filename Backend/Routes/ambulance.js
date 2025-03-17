import express from "express";
import { authenticate, restrict } from "../auth/verifyToken.js";
import {
  bookAmbulance,
  acceptBooking,
  updateBookingStatus,
  getDriverDashboard,
  getBookingStatus,
} from "../Controllers/ambulanceController.js";

const router = express.Router();

router.post("/book-ambulance", authenticate, restrict(["patient"]), bookAmbulance);
router.get("/booking-status/:id", authenticate, restrict(["patient"]), getBookingStatus);
router.put("/accept-booking/:id", authenticate, restrict(["driver"]), acceptBooking);
router.put("/update-booking/:id", authenticate, restrict(["driver"]), updateBookingStatus);
router.get("/driver-dashboard", authenticate, restrict(["driver"]), getDriverDashboard);

export default router;