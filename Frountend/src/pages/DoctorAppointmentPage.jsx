import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const AppointmentBooking = ({ doctorId, userId }) => {
  // State variables
  const [doctorInfo, setDoctorInfo] = useState(null);
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  // Fetch doctor info when component mounts or doctorId changes
  useEffect(() => {
    const fetchDoctorInfo = async () => {
      try {
        const response = await fetch(`/api/doctors/${doctorId}`);
        const data = await response.json();
        setDoctorInfo(data);
        // Extract unique dates from timeSlots
        if (data.timeSlots && data.timeSlots.length > 0) {
          const dates = data.timeSlots.map(slot => slot.date);
          setAvailableDates([...new Set(dates)]);
        }
      } catch (error) {
        console.error('Error fetching doctor info:', error);
      }
    };
    fetchDoctorInfo();
  }, [doctorId]);

  // Handle date selection from calendar
  const handleDateClick = (arg) => {
    const date = arg.dateStr; // e.g., "2024-07-15"
    if (availableDates.includes(date)) {
      setSelectedDate(date);
      const slotsForDate = doctorInfo.timeSlots.find(slot => slot.date === date);
      setAvailableTimes(slotsForDate ? slotsForDate.times : []);
      setSelectedTimeSlot(null); // Reset time slot selection
    } else {
      alert('This date is not available.');
    }
  };

  // Handle booking button click
  const handleBookAppointment = () => {
    if (selectedTimeSlot) {
      const bookingData = {
        doctor: doctorId,
        user: userId,
        ticketPrice: doctorInfo.ticketPrice,
        appointmentDate: selectedDate,
        appointmentTime: selectedTimeSlot,
        status: 'pending',
        isPaid: false,
      };
      // Simulate booking (replace with actual API call)
      alert(`Booking appointment with Dr. ${doctorInfo.name} on ${selectedDate} at ${selectedTimeSlot} for $${doctorInfo.ticketPrice}`);
      console.log('Booking Data:', bookingData);
      // Example API call (uncomment and adjust as needed):
      // fetch('/api/bookings', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(bookingData),
      // }).then(response => response.json()).then(data => console.log('Booking created:', data));
    }
  };

  // Loading state
  if (!doctorInfo) {
    return <p className="text-gray-500">Loading doctor information...</p>;
  }

  // No available slots
  if (!doctorInfo.timeSlots || doctorInfo.timeSlots.length === 0) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800">{doctorInfo.name}</h1>
        <p className="text-gray-500 mt-2">No available slots for this doctor.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Doctor Information */}
      <div className="flex items-center mb-6">
        <img
          src={doctorInfo.photo}
          alt={doctorInfo.name}
          className="w-24 h-24 rounded-full mr-4 object-cover"
        />
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{doctorInfo.name}</h1>
          <p className="text-gray-600">{doctorInfo.specialization}</p>
          <p className="text-gray-600">Ticket Price: ${doctorInfo.ticketPrice}</p>
          <p className="text-gray-700 mt-2">{doctorInfo.about}</p>
        </div>
      </div>

      {/* Calendar */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Select a Date</h2>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={[]} // Not using events, just highlighting dates
          dateClick={handleDateClick}
          dayCellClassNames={(arg) => {
            const dateStr = arg.date.toISOString().split('T')[0];
            return availableDates.includes(dateStr)
              ? 'bg-green-100 cursor-pointer'
              : 'bg-gray-200 pointer-events-none opacity-50';
          }}
        />
      </div>

      {/* Time Slots */}
      {selectedDate && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Available Time Slots for {selectedDate}
          </h2>
          {availableTimes.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {availableTimes.map((time) => (
                <button
                  key={time}
                  className={`p-2 border rounded text-sm font-medium transition-colors ${
                    selectedTimeSlot === time
                      ? 'bg-blue-500 text-white'
                      : 'bg-white text-gray-800 hover:bg-blue-100'
                  }`}
                  onClick={() => setSelectedTimeSlot(time)}
                >
                  {time}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No time slots available for this date.</p>
          )}
        </div>
      )}

      {/* Book Appointment Button */}
      <button
        className={`px-6 py-2 rounded font-semibold text-white transition-opacity ${
          selectedTimeSlot
            ? 'bg-green-500 hover:bg-green-600'
            : 'bg-green-300 opacity-50 cursor-not-allowed'
        }`}
        onClick={handleBookAppointment}
        disabled={!selectedTimeSlot}
      >
        Book Appointment
      </button>
    </div>
  );
};

export default AppointmentBooking;