const { render } = require("@react-email/render");
const nodemailer = require("nodemailer");
const AppointmentConfirmation = require("../emails/AppointmentConfirmation").default;

// Configure Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "krutagya.kaneria.cg@gmail.com",
    pass: "Krutagya!190312", // Use an app password for security
  },
});

// Function to Send Confirmation Email
const sendConfirmationEmail = async (patientEmail, appointmentDetails) => {
  const emailHtml = render(
    AppointmentConfirmation({
      date: appointmentDetails.date,
      time: appointmentDetails.time,
      doctor: appointmentDetails.doctor,
    })
  );

  const mailOptions = {
    from: "your-email@gmail.com",
    to: patientEmail,
    subject: "Your Appointment is Confirmed",
    html: emailHtml, // Rendered React Email HTML
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ Confirmation email sent!");
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
};

module.exports = sendConfirmationEmail;
