import nodemailer from "nodemailer";

// Configure Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER || "krutagya.kaneria.cg@gmail.com",
    pass: process.env.EMAIL_PASS || "Krutagya!190312", // Replace with app password
  },
});

// Generic function to send email (for ambulance bookings)
export const sendEmail = async (to, subject, options = {}) => {
  const { text, html } = options;

  const mailOptions = {
    from: process.env.EMAIL_USER || "krutagya.kaneria.cg@gmail.com",
    to,
    subject,
    ...(text && { text }),
    ...(html && { html }),
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error(`❌ Error sending email: ${error}`);
    throw new Error("Failed to send email");
  }
};