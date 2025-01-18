import React from 'react'
import { assets } from '../assets/assets'

const Home = () => {
  return (
    <div className='w-full min-h-[80vh] flex items-center justify-center'>
        <img className='sm:w-96 w-52 transition-all duration-300 animate-slide-down' src={assets.admin_page} alt="" />
    </div>
  )
}

export default Home