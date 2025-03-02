const Appointment = require("../models/appointmentModel"); // Import your appointment model
const nodemailer = require("nodemailer");

exports.sendConfirmationEmail = async (req, res) => {
    try {
        const { patientId } = req.body; // Get patientId from frontend

        // Fetch patient appointment details from MongoDB
        const appointment = await Appointment.findById(patientId).populate("patientId");

        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found!"
            });
        }

        // Extract email and details
        const patientEmail = appointment.patientId.email; // Assuming email is in patientId field
        const appointmentDetails = `Your appointment with Dr. ${appointment.doctorName} is on ${appointment.date} at ${appointment.time}`;

        // Setup Nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // Email options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: patientEmail,
            subject: "Appointment Confirmation",
            text: appointmentDetails
        };

        // Send Email
        await transporter.sendMail(mailOptions);

        res.status(200).json({
            success: true,
            message: "Confirmation email sent to patient!"
        });

    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error!"
        });
    }
};
