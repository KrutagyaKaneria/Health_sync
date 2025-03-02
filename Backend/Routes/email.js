import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

router.post("/send-confirmation-email", async (req, res) => {
  const { patientEmail, appointmentDetails } = req.body;

  if (!patientEmail || !appointmentDetails) {
    return res.status(400).json({ success: false, message: "Missing patient email or appointment details" });
  }

  // ✅ Set up Nodemailer with Gmail
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // Your Gmail
      pass: process.env.EMAIL_PASS, // Your App Password
    },
  });

  // ✅ Email details (using HTML template)
  const mailOptions = {
    from: `"HealthSync" <${process.env.EMAIL_USER}>`,
    to: patientEmail,
    subject: "Appointment Confirmation",
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Appointment Confirmation</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f9f9f9; padding: 20px; }
          .email-container { max-width: 600px; margin: 0 auto; background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }
          .header { text-align: center; padding-bottom: 20px; border-bottom: 1px solid #ddd; }
          .header h1 { margin: 0; font-size: 24px; color: #007BFF; }
          .content { padding: 20px 0; }
          .content p { margin: 10px 0; }
          .footer { text-align: center; padding-top: 20px; border-top: 1px solid #ddd; font-size: 14px; color: #777; }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <h1>Appointment Confirmation</h1>
          </div>
          <div class="content">
            <p>Dear Patient,</p>
            <p>We are pleased to confirm your appointment with <strong>${appointmentDetails.doctor}</strong> on <strong>${appointmentDetails.date}</strong> at <strong>${appointmentDetails.time}</strong>.</p>
            <p>Here are the details of your appointment:</p>
            <ul>
              <li><strong>Doctor:</strong> ${appointmentDetails.doctor}</li>
              <li><strong>Date:</strong> ${appointmentDetails.date}</li>
              <li><strong>Time:</strong> ${appointmentDetails.time}</li>
              <li><strong>Status:</strong> ${appointmentDetails.status}</li>
            </ul>
            <p>If you have any questions or need to reschedule, please contact us at <a href="mailto:support@healthsync.com">support@healthsync.com</a>.</p>
            <p>Thank you for choosing <strong>HealthSync</strong>. We look forward to serving you!</p>
          </div>
          <div class="footer">
            <p>Best regards,</p>
            <p><strong>HealthSync Team</strong></p>
            <p><a href="https://www.healthsync.com">www.healthsync.com</a></p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Confirmation email sent to patient!" });
  } catch (error) {
    console.error("❌ Email Sending Error:", error);
    res.status(500).json({ success: false, message: "Failed to send email", error: error.message });
  }
});

export default router;