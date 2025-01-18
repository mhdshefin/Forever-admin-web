import React, { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Login = ({ setToken }) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault()
            const response = await axios.post(backendUrl + '/api/user/admin', { email, password })   
            if (response.data.success) {
                setToken(response.data.token)
            } else {
                toast.error("Invalid email or password")
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }

    }
    return (
        <div className='w-full max-h-screen min-h-screen bg-[#12C654] flex items-center justify-center'>
            <div className='bg-white shadow-xl rounded-xl px-8 py-8 max-w-md flex flex-col items-center'>
                <h1 className='text-2xl text-gray-800 font-bold mb-10'>Admin Panel</h1>
                <form onSubmit={onSubmitHandler}>
                    <div className='mb-3 min-w-72'>
                        <p className='text-sm font-medium mb-2 text-gray-700'>Email</p>
                        <input onChange={(e) => setEmail(e.target.value)} value={email} className='rounded-md px-3 py-2 outline-none border-gray-300 border w-full' type="email" placeholder='your@gmail.com' required />
                    </div>
                    <div className='mb-4 min-w-72'>
                        <p className='text-sm font-medium mb-2 text-gray-700'>Password</p>
                        <input onChange={(e) => setPassword(e.target.value)} value={password} className='rounded-md px-3 py-2 outline-none border-gray-300 border w-full' type="password" placeholder='your password' required />
                    </div>
                    <button className='px-2 py-1 bg-black text-white mt-2 w-full rounded-md hover:bg-gray-900 text-sm h-11' type='submit'>Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login