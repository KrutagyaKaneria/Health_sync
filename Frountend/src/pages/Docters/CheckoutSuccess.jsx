import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

const CheckoutSuccess = () => {
  const [patientEmail, setPatientEmail] = useState("");
  const [appointmentDetails, setAppointmentDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAppointmentDetails();
  }, []);

  const fetchAppointmentDetails = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      if (!userId || !token) {
        console.error("❌ User ID or Token not found in localStorage");
        setLoading(false);
        return;
      }

      // Fetch user email & appointments simultaneously
      const [userResponse, appointmentResponse] = await Promise.all([
        fetch(`http://localhost:5000/api/v1/users/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }),
        fetch(`http://localhost:5000/api/v1/users/appointments/my-appointments`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);

      // Handle User Data Response
      const userData = await userResponse.json();
      if (userResponse.ok && userData.data) {
        setPatientEmail(userData.data.email);
      } else {
        console.error("❌ Failed to fetch user email:", userData.message);
      }

      // Handle Appointment Data Response
      const appointmentData = await appointmentResponse.json();
      if (!appointmentResponse.ok || !Array.isArray(appointmentData.data) || appointmentData.data.length === 0) {
        console.warn("⚠ No appointment found!");
        setLoading(false);
        return;
      }

      let appointments = appointmentData.data;

      // Fetch all doctor details in parallel
      const doctorPromises = appointments.map(async (appointment) => {
        try {
          if (!appointment.doctor) return;
          const doctorResponse = await fetch(`http://localhost:5000/api/v1/doctors/${appointment.doctor}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          const doctorData = await doctorResponse.json();
          if (doctorResponse.ok && doctorData.data) {
            appointment.doctor = doctorData.data; // Replace ID with full doctor details
          } else {
            console.warn("⚠ Failed to fetch doctor details for appointment ID:", appointment._id);
            appointment.doctor = { name: "Unknown Doctor" };
          }
        } catch (error) {
          console.error("❌ Error fetching doctor details:", error);
          appointment.doctor = { name: "Unknown Doctor" };
        }
      });

      // Wait for all doctor details to be fetched
      await Promise.all(doctorPromises);

      // Set the first appointment (or handle multiple appointments if needed)
      setAppointmentDetails(appointments[0]);
      setLoading(false);
    } catch (error) {
      console.error("❌ Error fetching appointment data:", error);
      setLoading(false);
    }
  };

  const handleSendEmail = async () => {
    console.log("📩 Sending email with details:", { patientEmail, appointmentDetails });

    if (!patientEmail || !appointmentDetails) {
      console.warn("⚠ Missing patient email or appointment details. Cannot send email.");
      toast.error("Email sending failed: Missing patient email or appointment details.");
      return;
    }

    // Ensure proper appointment details format
    const sanitizedAppointmentDetails = {
      date: appointmentDetails.date || "2025-03-02",
      time: appointmentDetails.time || "12:00 PM",
      doctorName: appointmentDetails.doctor?.name || "Doctor Info Unavailable",
      ticketPrice: appointmentDetails.ticketPrice || 0,
      status: appointmentDetails.status || "Pending",
    };

    const emailPayload = {
      patientEmail: patientEmail,
      appointmentDetails: {
        doctor: sanitizedAppointmentDetails.doctorName,
        date: sanitizedAppointmentDetails.date,
        time: sanitizedAppointmentDetails.time,
      },
    };

    console.log("📤 Sending email payload:", JSON.stringify(emailPayload, null, 2));

    try {
      const response = await fetch("http://localhost:5000/api/v1/email/send-confirmation-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emailPayload),
      });

      const data = await response.json();
      console.log("📩 Server Response:", data);

      if (response.ok) {
        console.log("✅ Confirmation email sent successfully!", data);
        toast.success("Email sent successfully! Redirecting to home...");
        setTimeout(() => {
          navigate("/home");
        }, 3000); // Redirect after 3 seconds
      } else {
        console.error("❌ Email sending failed:", data);
        toast.error(`Email sending failed: ${data.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("❌ Error sending email:", error);
      toast.error("Error sending email. Please try again.");
    }
  };

  return (
    <div className="bg-gray-100 h-screen">
      <div className="bg-white p-6 md:mx-auto">
        <svg
          viewBox="0 0 24 24"
          className="text-green-600 w-16 h-16 mx-auto my-6"
        >
          <path
            fill="currentColor"
            d="M12,0A12,12,0,1,0,24,12,12.014,12,.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
          ></path>
        </svg>
        <div className="text-center">
          <h3 className="md:text-2xl text-base text-gray-900 font-semibold">
            Payment Done!
          </h3>
          <p className="text-gray-600 my-2">
            Thank you for completing your secure online payment.
          </p>
          <p>Have a great day! </p>

          {/* Loading State */}
          {loading ? (
            <p className="text-blue-600 font-semibold mt-4">Loading appointment details...</p>
          ) : (
            <>
              {/* Send Email Button */}
              <button
                onClick={handleSendEmail}
                className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
              >
                Send Email & Go Home
              </button>
            </>
          )}

          <div className="py-10 text-center">
            <Link
              to="/home"
              className="px-12 bg-buttonBgColor text-white font-semibold py-3"
            >
              Go Back To Home
            </Link>
          </div>
        </div>
      </div>

      {/* Toastify Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default CheckoutSuccess;