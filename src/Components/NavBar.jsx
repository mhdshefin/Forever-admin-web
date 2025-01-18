import React from 'react'
import { assets } from '../assets/assets'

const NavBar = ({setToken}) => {
  return (
    <div className='flex items-center justify-between px-[4%] sm:min-h-[8vh] min-h-[6vh]'>
        <img className='w-[max(10%,80px)]' src={assets.logo} alt="" />
        <button onClick={()=>setToken("")} className='bg-gray-600 text-white px-4 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm hover:bg-gray-700'>Logout</button>
    </div>
  )
}

export default NavBar