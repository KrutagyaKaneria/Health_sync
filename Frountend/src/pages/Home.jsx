import React from 'react'
import groupphoto from '../assets/images/Group 4297.png'
import heroImg1 from '../assets/images/hero-img01.png'
import heroImg2 from '../assets/images/hero-img02.png'
import heroImg3 from '../assets/images/hero-img03.png'

const Home = () => {
  return (
    <>
      <section className='hero_section pt-[60px] 2xl:h-[800px]'>
        <div className='container'>
          <div className='flex flex-col lg:flex-row gap-[90px] items-center justify-between'>
            {/* hero---content */}
            <div>
              <div className='lg:w-[570px]'>
                <h1 className='text-[36px] leading-[46px] text-headingColor font-[800] md:text-[60px] md:leading-[70px]'> We help patients live a healthy, longer life.</h1>
      <div className="w-full relative h-28 text-left text-lg text-white font-outfit">
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
</>         
  )
}

export default Home
