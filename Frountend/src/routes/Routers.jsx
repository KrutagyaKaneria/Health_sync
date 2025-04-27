import React from 'react'
import Home from "../pages/Home"
import Login from "../pages/Login"
import Signup from "../pages/Signup"
import Contact from "../pages/Contact"
import Services from "../pages/Services"
import Doctors from '../pages/Docters/Doctors'
import DoctorDetails from '../pages/Docters/DoctorDetails'
import MyAccount from '../Dashboard/user-account/MyAccount'
import DashBoard from '../Dashboard/doctor-account/DashBoard'
import CheckoutSuccess from '../pages/Docters/CheckoutSuccess'
import AppointmentBooking from '../pages/DoctorAppointmentPage'



import {Route, Routes} from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'

const Routers = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/doctors' element={<Doctors/>}/>
      <Route path='/doctors/:id' element={<DoctorDetails/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Signup/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/services' element={<Services/>}/>
      <Route path="/doctors/:doctorId/book"element={<AppointmentBooking />}/>
      <Route path='/checkout-success' element={<CheckoutSuccess/>}/>
      <Route path='/users/profile/me' element={<ProtectedRoute allowedRoles={['patient']}><MyAccount/></ProtectedRoute>}/>
      <Route path='/doctors/profile/me' element={<ProtectedRoute allowedRoles={['doctor']}><DashBoard/></ProtectedRoute>}/>
    </Routes>
  )
}

export default Routers
