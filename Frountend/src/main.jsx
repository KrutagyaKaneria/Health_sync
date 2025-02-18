import React from 'react'
import ReactDom from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import  "react-toastify/dist/ReactToastify.css"
import { AuthContextProvider } from './context/AuthContext.jsx'

ReactDom.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthContextProvider>
    <App />
    <ToastContainer
    theme='dark'
    position='top-right'
    autoClose={3000}
    closeOnClick
    pauseOnHover={false}
     />
     </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
)
