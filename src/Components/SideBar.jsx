import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const SideBar = () => {
    return (
        <div className='min-w-[15%]'>
            <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px] border min-h-screen overflow-x-hidden'>

                <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded transition-all duration-200 hover:scale-105 hover:shadow-md hover:bg-white' to='/add'>
                <img className='w-5 h-5' src={assets.add_icon} alt="" />
                <p className='hidden sm:block'>Add Items</p>
                </NavLink>

                <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded transition-all duration-200 hover:scale-105 hover:shadow-md hover:bg-white' to='/list'>
                <img className='w-5 h-5' src={assets.order_icon} alt="" />
                <p className='hidden sm:block'>List Items</p>
                </NavLink>

                <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded transition-all duration-200 hover:scale-105 hover:shadow-md  hover:bg-white' to='/orders'>
                <img className='w-5 h-5' src={assets.order_icon} alt="" />
                <p className='hidden sm:block'>Order</p>
                </NavLink>
            </div>
        </div>
    )
}

export default SideBar