import React from 'react'
import { formateDate } from '../../utils/formateData.js'

const DoctorAbout = ({name,about,qualifications,experiences}) => {
  return (
    <div>
    <div>
      <h3 className='text-[20px] leading-[30px] text-headingColor font-semibold flex items-center gap-2'>
        About of
        <span className='text-irisBlueColor font-bold text-[24px] leading-6'>
            jiten Panjwani
        </span>
      </h3>
      <p className='text_para'>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
      </p>
    </div>


    <div className='mt-12'>
        <h3 className='text-[20px] leading-[30px] text-headingColor font-semibold'>
            Education
        </h3>

        <ul className='pt-4 md:p-5'>
            <li className='flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]'>
                <div>
                    <span className='text-irisBlueColor text-[15px] leading-6 font-semibold'>
                    {formateDate("08-02-2024")}  -  {formateDate("10-02-2025")}
                    </span>
                    <p className='text-[16px] leading-6 font-medium text-textColor'>
                        PHD in Surgeon
                    </p>
                </div>
                <p className='text-[14px] leading-5 font-medium text-textColor'>
                        New apollo Hospital, Delhi
                </p>
            </li>
            <li className='flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]'>
                <div>
                    <span className='text-irisBlueColor text-[15px] leading-6 font-semibold'>
                        {formateDate("07-04-2010")}  -  {formateDate("12-07-2013")}
                    </span>
                    <p className='text-[16px] leading-6 font-medium text-textColor'>
                        PHD in Surgeon
                    </p>
                </div>
                <p className='text-[14px] leading-5 font-medium text-textColor'>
                        New apollo Hospital, Delhi
                </p>
            </li>
        </ul>
    </div>

    <div className='mt-12'>
        <h3 className='text-[20px] leading-[30px] text-headingColor font-semibold'>
            Experience
        </h3>
        <ul className='grid sm:grid-cols-2 gap-[30px] pt-4 md:p-5'>
            <li className='p-4 rounded bg-[#fff9ea]'>
                <span className='text-yellowColor text-[15px] leading-6 font-semibold'>
                {formateDate("07-04-2010")}  -  {formateDate("12-07-2013")}
                </span>
                <p className='text-[15px] leading-6 font-medium text-textColor'>
                        Sr.Surgeon
                    </p>
                    <p className='text-[14px] leading-5 font-medium text-textColor'>
                    New apollo Hospital, Delhi
                    </p>
            </li>
            <li className='p-4 rounded bg-[#fff9ea]'>
                <span className='text-yellowColor text-[15px] leading-6 font-semibold'>
                {formateDate("07-04-2010")}  -  {formateDate("12-07-2013")}
                </span>
                <p className='text-[15px] leading-6 font-medium text-textColor'>
                        Sr.Surgeon
                    </p>
                    <p className='text-[14px] leading-5 font-medium text-textColor'>
                    New apollo Hospital, Delhi
                    </p>
            </li>
        </ul>
    </div>
    </div>
  )
}

export default DoctorAbout
