import React from 'react'
import { useEffect,useRef } from 'react'
import Logo from "../../assets/images/logo.png"
import UserImg from "../../assets/images/avatar-icon.png"
import {BiMenu} from "react-icons/bi"
import {NavLink,Link} from 'react-router-dom'
import "../../index.css";
import "../../App.css"


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
    const headerRef = useRef(null)
    const menuRef = useRef(null)
  
  const handleStickyHeader = () => {
    window.addEventListener('scroll', () => {
      if(document.body.scrollTop > 80 || document.documentElement.scrollTop > 80){
        headerRef.current.classList.add('sticky_header')
      }else{
        headerRef.current.classList.remove('sticky_header')
      }
    })
  }
  
  useEffect(() => {
    handleStickyHeader();
    
    return () => window.removeEventListener('scroll',handleStickyHeader);
  });

  const toggleMenu = () => menuRef.current.classList.toggle('show_menu')

  return (
    <header className="bg-[url('./assets/images/mask.png')] bg-no-repeat bg-center bg-cover w-full h-[100px] leading-[100px]" ref={headerRef}>
      <div className='max-w-full w-[1440px] px-5 mx-auto'>
        <div className='flex items-center justify-between'>
          {/* logo */}
          <div>
            <img src={Logo} alt="" />
          </div>

          {/* menu */}

          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
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

          {/* nav-right */}

          <div className='flex items-center gap-4'>
            <div className='hidden'>
              <Link to='./'>
              <figure className='w-[35px] h-[35px] rounded-full cursor-pointer'>
                <img src={UserImg} className='w-full rounded-full' alt="" />
              </figure>
              </Link>
            </div>

            <Link to='/login'>
            <button className='bg-[#0067FF] py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[10px]'>Login</button>
            </Link>

            <span className='md:hidden' onClick={toggleMenu}>
              <BiMenu className='w-6 h-6 cursor-pointer' />
            </span>


          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
