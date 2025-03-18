import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../../config';
import { toast } from 'react-toastify';
import HashLoader from 'react-spinners/HashLoader';
import useFetchData from '../../hooks/useFetchData.jsx';

const DriverDashboard = () => {
  const [newRequests, setNewRequests] = useState([]);
  const [myBookings, setMyBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const { data: driverData, loading: profileLoading, error: profileError } = useFetchData(`${BASE_URL}/drivers/profile/me`); // Updated endpoint

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/ambulance/driver-dashboard`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message || "Failed to fetch dashboard");
      }
      setNewRequests(result.data.newRequests);
      setMyBookings(result.data.myBookings);
    } catch (err) {
      toast.error(err.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const handleAccept = async (bookingId) => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/ambulance/accept-booking/${bookingId}`, {
        method: "PUT",
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message || "Failed to accept booking");
      }
      toast.success("Booking accepted!");
      fetchDashboard();
    } catch (err) {
      toast.error(err.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleEndRide = async (bookingId) => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/ambulance/update-booking/${bookingId}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status: "completed" }),
      });
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message || "Failed to end ride");
      }
      toast.success("Ride completed!");
      fetchDashboard();
    } catch (err) {
      toast.error(err.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  if (profileLoading) return <HashLoader size={50} color="#0066ff" />;
  if (profileError) return <p className="text-red-600">Error: {profileError}</p>;

  return (
    <section className='max-w-[1170px] px-5 mx-auto'>
      <div className='grid md:grid-cols-3 gap-10'>
        <div className='pb-[50px] px-[30px] rounded-md'>
          <div className='flex items-center justify-center'>
            <figure className='w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor'>
              <img src={driverData?.photo} alt="" className='w-full h-full rounded-full' />
            </figure>
          </div>
          <div className='text-center mt-4'>
            <h3 className='text-[18px] leading-[30px] text-headingColor font-bold'>{driverData?.name}</h3>
            <p className='text-textColor text-[15px] leading-6 font-medium'>{driverData?.email}</p>
            <p className='text-textColor text-[15px] leading-6 font-medium'>License: {driverData?.licenseNumber}</p>
            <p className='text-textColor text-[15px] leading-6 font-medium'>Ambulance: {driverData?.ambulanceNumber}</p>
          </div>
        </div>

        <div className='md:col-span-2 md:px-[30px]'>
          <h3 className='text-headingColor text-[20px] leading-9 font-bold mb-5'>Driver Dashboard</h3>
          {loading && <HashLoader size={50} color="#0066ff" />}
          {!loading && (
            <>
              <h4 className='text-headingColor text-[18px] font-semibold mb-3'>New Requests</h4>
              {newRequests.length === 0 ? (
                <p>No new requests</p>
              ) : (
                newRequests.map((booking) => (
                  <div key={booking._id} className='mb-3 p-3 border rounded-md'>
                    <p>Pickup: {booking.pickupAddress}</p>
                    <p>Destination: {booking.destination}</p>
                    <button
                      onClick={() => handleAccept(booking._id)}
                      className='bg-primaryColor text-white px-4 py-2 rounded-md mt-2'
                    >
                      Accept
                    </button>
                  </div>
                ))
              )}

              <h4 className='text-headingColor text-[18px] font-semibold mb-3 mt-5'>My Bookings</h4>
              {myBookings.length === 0 ? (
                <p>No bookings assigned</p>
              ) : (
                myBookings.map((booking) => (
                  <div key={booking._id} className='mb-3 p-3 border rounded-md'>
                    <p>Pickup: {booking.pickupAddress}</p>
                    <p>Destination: {booking.destination}</p>
                    <p>Status: {booking.status}</p>
                    {booking.status === "running" && (
                      <button
                        onClick={() => handleEndRide(booking._id)}
                        className='bg-green-600 text-white px-4 py-2 rounded-md mt-2'
                      >
                        End Ride
                      </button>
                    )}
                  </div>
                ))
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default DriverDashboard;