import React from 'react'
import groupphoto from '../assets/images/Group 4297.png'

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

    </div>
  </div>
</div>
</section>         

    </>
  )
}

export default Home
