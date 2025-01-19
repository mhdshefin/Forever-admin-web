import React, { useEffect, useState } from 'react'
import NavBar from './Components/NavBar'
import SideBar from './Components/SideBar'
import { Route, Routes } from 'react-router-dom'
import Add from './Pages/Add'
import Order from './Pages/Order'
import List from './Pages/List'
import Login from './Components/Login'
import { ToastContainer } from 'react-toastify';
import Home from './Pages/Home'


export const backendUrl = import.meta.env.VITE_BACKEND_URL
export const currency = '₹'

const App = () => {

  const [token, setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):"");

  useEffect(() => {
    localStorage.setItem('token', token)
  }, [token])

  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer />
      {
        token === "" ?
          <Login setToken={setToken} />
          :
          <>
            <NavBar setToken={setToken} />
            <hr />
            <div className='min-h-screen w-full flex'>
              <SideBar />
              <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
                <Routes>
                  <Route path='/' element={<Home/>}/>
                  <Route path='/add' element={<Add token={token} />} />
                  <Route path='/list' element={<List token={token} />} />
                  <Route path='/orders' element={<Order token={token} backendUrl={backendUrl} />} />
                </Routes>
              </div>
            </div>
          </>
      }

    </div>
  )
}

export default App