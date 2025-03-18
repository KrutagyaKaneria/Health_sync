import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../../config';
import { toast } from 'react-toastify';
import HashLoader from 'react-spinners/HashLoader';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const AmbulanceBooking = () => {
  const [formData, setFormData] = useState({ pickupAddress: "", destination: "" });
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasActiveBooking, setHasActiveBooking] = useState(false);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    socket.emit('joinRoom', userId);

    // Check for active bookings on mount
    const checkActiveBooking = async () => {
      try {
        const res = await fetch(`${BASE_URL}/ambulance/booking-status/active`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        const result = await res.json();
        if (res.ok && result.data) {
          setBooking(result.data);
          setHasActiveBooking(true);
        }
      } catch (err) {
        console.error("Error checking active booking:", err);
      }
    };

    checkActiveBooking();

    socket.on('bookingUpdate', ({ bookingId, status }) => {
      if (booking && booking._id === bookingId) {
        setBooking(prev => ({ ...prev, status }));
        setHasActiveBooking(status !== 'completed'); // Disable booking if not completed
        toast.info(`Booking status updated to: ${status}`);
      }
    });

    return () => socket.off('bookingUpdate');
  }, [booking, userId]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/ambulance/book-ambulance`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message || "Booking Failed");
      }

      setBooking(result.data);
      setHasActiveBooking(true);
      toast.success("Ambulance booked successfully!");
      setFormData({ pickupAddress: "", destination: "" });
    } catch (err) {
      toast.error(err.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='p-5'>
      <h3 className='text-headingColor text-[20px] leading-9 font-bold mb-5'>
        Book an <span className='text-primaryColor'>Ambulance</span>
      </h3>
      {hasActiveBooking ? (
        <div className='mt-5 p-3 border rounded-md bg-gray-100'>
          <p>You have an active booking:</p>
          <p>Pickup: {booking?.pickupAddress}</p>
          <p>Destination: {booking?.destination}</p>
          <p>Status: <span className={booking?.status === 'pending' ? 'text-yellow-500' : booking?.status === 'running' ? 'text-green-500' : 'text-blue-500'}>{booking?.status}</span></p>
          <p className='text-red-500 mt-2'>Please wait until this ride is completed before booking another.</p>
        </div>
      ) : (
        <form onSubmit={submitHandler}>
          <div className='mb-5'>
            <input
              type="text"
              placeholder='Pickup Address'
              name='pickupAddress'
              value={formData.pickupAddress}
              onChange={handleInputChange}
              className='w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer'
              required
            />
          </div>
          <div className='mb-5'>
            <input
              type="text"
              placeholder='Destination'
              name='destination'
              value={formData.destination}
              onChange={handleInputChange}
              className='w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer'
              required
            />
          </div>
          <button
            disabled={loading}
            type='submit'
            className='w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3'
          >
            {loading ? <HashLoader size={25} color='#ffffff' /> : 'Book Ambulance'}
          </button>
        </form>
      )}
      {booking && !hasActiveBooking && (
        <div className='mt-5 p-3 border rounded-md'>
          <p>Pickup: {booking.pickupAddress}</p>
          <p>Destination: {booking.destination}</p>
          <p>Status: <span className={booking.status === 'pending' ? 'text-yellow-500' : booking.status === 'running' ? 'text-green-500' : 'text-blue-500'}>{booking.status}</span></p>
        </div>
      )}
    </div>
  );
};

export default AmbulanceBooking;