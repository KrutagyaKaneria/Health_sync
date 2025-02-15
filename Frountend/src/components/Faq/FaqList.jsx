import React from 'react'
import FaqItem from './Faqitem.jsx'
import { faqs } from './../../assets/data/faqs.js'


const FaqList = () => {
  return (
    <ul className='mt-[58px]'>
        {faqs.map((item,index)=> (
        <FaqItem item={item} key={index}/>
   ))}
</ul>
  )
}

export default FaqList
