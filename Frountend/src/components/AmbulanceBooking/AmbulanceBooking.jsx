import React, { useState } from 'react';
import { BASE_URL } from '../../config';
import { toast } from 'react-toastify';
import HashLoader from 'react-spinners/HashLoader';

const AmbulanceBooking = () => {
  const [formData, setFormData] = useState({
    pickupAddress: "",
    destination: "",
  });
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

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
    </div>
  );
};

export default AmbulanceBooking;