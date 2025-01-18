import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'

const List = ({ token }) => {

  const [list, setList] = useState([])

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list")
      if (response.data.success) {
        setList(response.data.products)
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  const removeProduct = async (id) => {

    try {
      const response = await axios.post(backendUrl + "/api/product/remove", { id }, { headers: { token } })
      if (response.data.success) {
        toast.success(response.data.message)
        await fetchList()
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }


  useEffect(() => {
    fetchList()
  }, [])
  return (

    <div>
      <p className='text-xl font-semibold text-gray-700 mb-3'>All Products List</p>

      <div className='flex flex-col'>

        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
          <b>Images</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Remove</b>
        </div>

        <div className='flex flex-col'>
          {
            list.map((item, index) => (
              <div key={index} className='grid grid-cols-[.7fr_2fr_1fr_0.5fr_0.5fr] sm:grid-cols-[1fr_3fr_1fr_1fr_1fr] py-1 items-center px-2 border sm:text-sm text-[9px]'>
                <img className='sm:w-14 w-7' src={item.images[0]} alt="" />
                <div className={`${window.innerWidth < 400 ? 'max-w-20 sm:max-w-72' : ''}`}>
                  <p className={`${window.innerWidth<400?'text-[8px]':''} leading-[1.5]`}>{item.name}</p>
                </div>
                <div className='flex items-center justify-center'>
                <p>{item.category}</p>
                </div>
                <div className='flex justify-center font-medium'>
                <p>{currency}{item.price}</p>
                </div>
                <p className='text-sm text-right md:text-center cursor-pointer' onClick={() => removeProduct(item._id)}>X</p>
              </div>
            ))
          }
        </div>

      </div>
    </div>
  )
}

export default List