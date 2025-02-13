import React from 'react'
import groupphoto from '../assets/images/Group 4297.png'
import heroImg1 from '../assets/images/hero-img01.png'
import heroImg2 from '../assets/images/hero-img02.png'
import heroImg3 from '../assets/images/hero-img03.png'
import createaccimg from '../assets/images/createaccimg.png'

const Home = () => {
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








</section>
</>         
  );
};

export default Home
