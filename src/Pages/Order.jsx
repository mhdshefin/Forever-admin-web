import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'
import { currency } from '../App'

const Order = ({ token, backendUrl }) => {

  const [orders, setOrders] = useState([])
  const [total, setTotal] = useState(0)
  const [orderCompleted, setOrderCompleted] = useState(0)

  const getAllOrders = async () => {

    if (!token) {
      return null
    } else {
      try {

        const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } })
        if (response.data.success) {
          setOrders(response.data.orders)
        } else {
          toast.error(response.data.message)
        }
      } catch (error) {
        toast.error(error.message)
      }
    }
  }

  const getOrderCompleted = () => {
    const completedOrders = orders.filter((item) => item.status === "Delivered");
    setOrderCompleted(completedOrders.length);
  }

  const statusHandler = async (e, orderId) => {
    try {
      const response = await axios.post(backendUrl + '/api/order/status', { orderId, status: e.target.value }, { headers: { token } })
      if (response.data.success) {
        await getAllOrders()
      }
    } catch (error) {
      console.log(error);
      toast.error(response.data.message)
    }
  }

  const getToatalOrdersAmount = () => {
    let total = 0;
    total = orders.length
    setTotal(total)
  }

  useEffect(() => {
    getAllOrders()
  }, [token])

  useEffect(() => {
    setOrders(orders)
    getToatalOrdersAmount()
    getOrderCompleted()
  }, [orders])
  return (
    <div>
      <h3>Order </h3>
      <div className='flex w-full justify-between mt-5 sm:text-lg text-[12px] font-medium text-white'>
        <div className='flex items-center justify-center shadow-lg bg-[#393939] rounded-lg w-[48%] px-2 h-16'>
          <p>Total Orders : {total}</p>
        </div>
        <div className='flex items-center justify-center shadow-lg bg-[#393939] rounded-lg w-[48%] px-2 h-16'>
          <p>Order Completed : {orderCompleted}</p>
        </div>
      </div>
      <div>
        {orders.map((order, index) => (

          <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700' key={index}>
            <img className='w-12 sm:w-16' src={assets.parcel_icon} alt="" />
            <div>
              {order.items.map((item, index) => {
                if (index === order.items.length - 1) {
                  return (<p className='text-[12px] sm:text-[15px] font-semibold mb-1 mt-1' key={index}>{item.name} x {item.quantity} <span>{item.size}</span> </p>)
                } else {
                  return (<p className='text-[12px] sm:text-[15px] font-semibold mb-1 mt-1' key={index}>{item.name} x {item.quantity} <span>{item.size}</span> ,</p>)
                }
              })}
              <p className='text-[13px] sm:text-[16px] mt-4 font-bold'>{order.address.firstName + " " + order.address.lastName}</p>
              <div>
                <div className='text-[12px] sm:text-[15px] mt-3 gap-1'>
                  <p>{order.address.street + ","}</p>
                  <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
                </div>
                <p className='text-[12px] sm:text-[15px]'>{order.address.phone}</p>
              </div>
            </div>
            <div className='text-[12px] sm:text-[14px]'>
              <p className='mt-1'>Items: {order.items.length}</p>
              <p className='mt-1'>Method: {order.paymentMethod}</p>
              <p className='mt-1'>Payment: {order.payment ? "Done" : "Pending"}</p>
              <p className='mt-1'>Date: {new Date(order.date).toLocaleDateString()}</p>
              <p className='mt-2 font-semibold'>{currency}{order.amount}</p>
            </div>
            <select onChange={(e) => statusHandler(e, order._id)} value={order.status} className='h-10 outline-none border-2 border-gray-200 rounded-lg pl-2'>
              <option value="Order placed">Order placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>


          </div>
        ))}
      </div>
    </div>
  )
}

export default Order