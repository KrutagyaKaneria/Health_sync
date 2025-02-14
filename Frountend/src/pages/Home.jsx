import React from 'react'
import groupphoto from '../assets/images/Group 4297.png'
import heroImg1 from '../assets/images/hero-img01.png'
import heroImg2 from '../assets/images/hero-img02.png'
import heroImg3 from '../assets/images/hero-img03.png'
import createaccimg from '../assets/images/createaccimg.png'
import icon01 from '../assets/images/icon01.png'
import icon02 from '../assets/images/icon02.png'
import icon03 from '../assets/images/icon03.png' 
import {BsArrowRight,} from "react-icons/bs";
import {Link} from 'react-router-dom'
import General_physician from '../assets/images/General_physician.svg'
import Gynecologist from '../assets/images/Gynecologist.svg'
import Dermatologist from '../assets/images/Dermatologist.svg'
import Pediatricians from '../assets/images/Pediatricians.svg'
import Neurologist from '../assets/images/Neurologist.svg'
import Gastroenterologist from '../assets/images/Gastroenterologist.svg'
import About from '../components/About/About.jsx'




const Home = () => {
  const doctors = [
    { name: "General_physician", img: General_physician },
    { name: "Gynecologist", img: Gynecologist },
    { name: "Dermatologist", img: Dermatologist },
    { name: "Pediatricians", img: Pediatricians },
    { name: "Neurologist", img: Neurologist },
    { name: "Gastroenterologist", img: Gastroenterologist },
  ];


  return (
    <>
    {/* hero section */}
      <section className='hero_section pt-[60px] 2xl:h-[800px]'>
        <div className='container'>
          <div className='flex flex-col lg:flex-row gap-[90px] items-center justify-between'>
            {/* hero---content */}
            <div>
              <div className='lg:w-[570px]'>
                <h1 className='text-[36px] leading-[46px] text-headingColor font-[800] md:text-[60px] md:leading-[70px]'> We help patients live a healthy, longer life.</h1>
      <div className="w-full mt-5 relative h-28 text-left text-[20px] text-white ">
        <div className="absolute top-[27px] left-[144px] leading-[27px] flex items-center w-[573px] h-[85px]">
          <span className="w-full">
            <p className="m-0">
              Simply browse through our extensive list of trusted doctors,
            </p>
            <p className="m-0">schedule your appointment hassle-free.</p>
          </span>
        </div>
        <img
          className="absolute top-[17px] left-[0px] w-[130px] h-14 object-contain"
          alt="Group Profiles"
          src={groupphoto}
        />
        <div className="absolute top-[0px] left-[144px] leading-[27px] text-black flex items-center w-[573px] h-[85px]">
          <span className="w-full">
            <p className="m-0">
              Simply browse through our extensive list of trusted doctors,
            </p>
            <p className="m-0">schedule your appointment hassle-free.</p>
          </span>
        </div>
      </div>
      <button className='btn'> Book Appointment</button>
  </div>

      {/* hero counter */}
      <div className='mt-[30px] lg:mt-[70px] flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-[30px]'>
        <div>
          <h2 className='text-[36px]  leading-[56px] lg:text-[44px] lg:leading-54px font-[700] text-headingColor'>
            30+
          </h2>
          <span className='w-[100px] h-2 bg-yellowColor rounded-full block mt-[-14px]'></span>
          <p className='text_para'>Years of Experience</p>
        </div>


        <div>
          <h2 className='text-[36px]  leading-[56px] lg:text-[44px] lg:leading-54px font-[700] text-headingColor'>
            15+
          </h2>
          <span className='w-[100px] h-2 bg-purpleColor rounded-full block mt-[-14px]'></span>
          <p className='text_para'>Years of Experience</p>
        </div>

        <div>
          <h2 className='text-[36px]  leading-[56px] lg:text-[44px] lg:leading-54px font-[700] text-headingColor'>
            100%
          </h2>
          <span className='w-[100px] h-2 bg-irisBlueColor rounded-full block mt-[-14px]'></span>
          <p className='text_para'>Patient Satisfaction</p>
        </div> 
      </div>
    </div>


    {/* hero content */}

<div className='flex gap-[30px] justify-end'>
  <div>
    <img src={heroImg1} alt="" className='w-full mb-[30px]'/>
  </div>
  <div className='mt-[30px]'>
  <img src={heroImg2} alt="" className='w-full mb-[30px]'/>
  <img src={heroImg3} alt="" className='w-full'/>
  </div>

</div>
</div>
</div>
</section>


<section>

<div className="w-full flex justify-center items-center h-[529px] text-left text-[40px] text-white">
  {/* Container */}
  <div className="relative w-[1273px] h-[364px] rounded-[10px] bg-mediumslateblue flex items-center justify-between px-10">
    {/* Left Side - Text */}
    <div>
      <h2 className="text-white text-[50px] font-[800] leading-[80px]">
        Book Appointment
        <br />
        With 100+ Trusted Doctors
      </h2>

      {/* Create Account Button */}
      <button className="mt-5 bg-white text-dimgray px-6 py-3 rounded-full text-[20px] font-semibold">
        Create account
      </button>
    </div>

    {/* Right Side - Image (Full but Bottom-Aligned) */}
    <img
      className="absolute bottom-0 right-0 w-[580px] h-auto object-cover z-10"
      alt="Create Account"
      src={createaccimg}
    />
  </div>
</div>
<div className='container'>
  <div className='lg:w-[470px] mx-auto'>
    <h2 className='heading text-center'>
      Providing the best medical services
    </h2>
    <p className='text_para text-center'>
      world-class care for everyone. Our health System Offers Unmatched,
      expert health care.
    </p>
  </div>
  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap=[30px] mt-[30px] lg:mt-[55px]'>

    <div className='py-[30px] px-5'>
      <div className='flex items-center justify-center'>
        <img src={icon01} alt="" />
      </div>

      <div className='mt-[30px]'>
        <h2 className='text-[26px] leading-9 text-headingColor font-[700] text-center'>
          Find a Doctor
        </h2>
        <p className='text-[16px] leading-7 text-textColor font-[400] mt-4 text-center'>world-class care for everyone. Our health System Offers Unmatched,
        expert health care. From the lab to the clinic</p>
        <Link to='/doctors' className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none">
        <BsArrowRight className='group-hover:text-white w-6 h-5' />
        </Link>
      </div>
    </div>

    <div className='py-[30px] px-5'>
      <div className='flex items-center justify-center'>
        <img src={icon02} alt="" />
      </div>

      <div className='mt-[30px]'>
        <h2 className='text-[26px] leading-9 text-headingColor font-[700] text-center'>
          Find a location
        </h2>
        <p className='text-[16px] leading-7 text-textColor font-[400] mt-4 text-center'>world-class care for everyone. Our health System Offers Unmatched,
        expert health care. From the lab to the clinic</p>
        <Link to='/doctors' className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none">
        <BsArrowRight className='group-hover:text-white w-6 h-5' />
        </Link>
      </div>
    </div>


    <div className='py-[30px] px-5'>
      <div className='flex items-center justify-center'>
        <img src={icon03} alt="" />
      </div>

      <div className='mt-[30px]'>
        <h2 className='text-[26px] leading-9 text-headingColor font-[700] text-center'>
          Book Appointment
        </h2>
        <p className='text-[16px] leading-7 text-textColor font-[400] mt-4 text-center'>world-class care for everyone. Our health System Offers Unmatched,
        expert health care. From the lab to the clinic</p>
        <Link to='/doctors' className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none">
        <BsArrowRight className='group-hover:text-white w-6 h-5' />
        </Link>
      </div>
    </div>
  </div>
</div>
</section>


{/* medical services  section */}
<div className='container'>
<div className='lg:w-[470px] mx-auto'>
    <h2 className='heading text-center'>
    Our Medical services
    </h2>
    <p className='text_para text-center'>
      world-class care for everyone. Our health System Offers Unmatched,
      expert health care.
    </p>
  </div>

<div className="w-full relative h-[173px] text-center text-lg text-dimgray font-outfit mt-16">
      <div className="absolute inset-0 flex justify-center gap-10">
        {doctors.map((doctor, index) => (
          <div key={index} className="flex flex-col items-center">
            <img
              src={doctor.img}
              alt={doctor.name}
              className="w-[125.7px] h-[125.7px] object-cover"
            />
            <span className="mt-2">{doctor.name}</span>
          </div>
        ))}
      </div>
    </div>
    </div>

{/* About section */}
<About/>

</>         
  );
};

export default Home
