import React from 'react'
import { useEffect,useRef } from 'react'
import Logo from "../../assets/images/logo.png"
import {NavLink,Link} from 'react-router-dom'
import "../../index.css";;


const navLinks = [
  {
    path:'/home',
    display: 'Home'
  },
  {
    path:'/doctors',
    display: 'Find a Doctor'
  },
  {
    path:'/services',
    display: 'services'
  },
  {
    path:'/contact',
    display: 'contact'
  },
]

const Header = () => {
  return (
    <header className='header flex items-center'>
      <div className='max-w-full w-[1440px] px-5 mx-auto'>
        <div className='flex items-center justify-between'>
          <div>
            <img src={Logo} alt="" />
          </div>

          {/* menu */}

          <div className="navigation">
            <ul className='flex items-center gap-[2.7rem]'>
              {
                navLinks.map((link,index)=>
                <li key={index}>
                  <NavLink to={link.path} 
                  className={navClass => navClass.isActive ? 'text-[#4E545F] text-[16px] leading-7 font-[600]' : 'text-[#0067FF] text-[16px] leading-7 font-[500] hover:text-[#0067FF]'}>
                  {link.display}
                  </NavLink>  
                </li>)
              }
            </ul>
          </div>

        </div>
      </div>
    </header>
  )
}

export default Header
