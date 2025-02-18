import React, { useState, useContext } from 'react'
import { Link , useNavigate} from 'react-router-dom';
import { BASE_URL } from '../config';
import { authContext } from '../context/AuthContext.jsx';
import { toast } from 'react-toastify';

const Login = () => {

  const [FormData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()
  const {dispatch} = useContext(authContext)

  const handleInpuutChnage = e => {
    setFormData({ ...FormData, [e.target.name]: e.target.value});
  };

  const submitHandler = async event => {
        event.preventDefault();
        setLoading(true);
        try{
          const res = await fetch(`${BASE_URL}/auth/login`,{
            method:"POST",
            headers:{
              'Content-Type':'application/json'
            },
            body: JSON.stringify(FormData)
          })
          const result = await res.json()
          if(!res.ok) {
            throw new Error(result.message || "Registration Failed")
          }

          dispatch( {
            type:"LOGIN_SUCCESS",
            payload: {
              user:result.data,
              token:result.token,
              role:result.role
            }
          });

          console.log(result, "login data")

          setLoading(false)
          toast.success("Registration successful!" || result.message)
          navigate('/home')
        }catch(err){
          toast.error(err.message || "Something went wrong!");
          setLoading(false)
        }
      }

  return (
    <section className='px-5 lg:px-0'>

      <div className='w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10'>
        <h3 className='text-headingColor text-[27px] leading-9 font-bold mb-10'>
          Hello! <span className='text-primaryColor'> Welcome</span> Back 🎉
        </h3>

        <form className='py-4 md:py-0' onSubmit={submitHandler}>
          <div className='mb-5'>
            <input 
            type="email"
            placeholder='Enter Your Email' 
            name='email'
            value={FormData.email}
            onChange={handleInpuutChnage}
            className='w-full  py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor  cursor-pointer'
            required
            />
          </div>
          <div className='mb-5'>
            <input 
            type="password"
            placeholder='Password' 
            name='password'
            value={FormData.password}
            onChange={handleInpuutChnage}
            className='w-full  py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor  cursor-pointer'
            required
            />
          </div>


          <div className=''>
            <button type='submit' className='w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3'>Login</button>
          </div>
          <p className='mt-5 text-textColor text-center'>Don&apos;t have an account? <Link to='/register' className="text-primaryColor font-medium ml-1">Register</Link></p>
        </form>
      </div>
    </section>
  )
}

export default Login
