import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Add = ({ token }) => {

  const [image1, setImage1] = useState(null)
  const [image2, setImage2] = useState(null)
  const [image3, setImage3] = useState(null)
  const [image4, setImage4] = useState(null)

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")
  const [SubCategory, setSubCategory] = useState("")
  const [bestseller, setBestseller] = useState(false)
  const [sizes, setSizes] = useState([])

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    try {
      const formData = new FormData()

      formData.append("name", name)
      formData.append("description", description)
      formData.append("price", price)
      formData.append("category", category)
      formData.append("subCategory", SubCategory)
      formData.append("bestSeller", bestseller)
      formData.append("sizes", JSON.stringify(sizes))

      image1 && formData.append("image1", image1)
      image2 && formData.append("image2", image2)
      image3 && formData.append("image3", image3)
      image4 && formData.append("image4", image4)

      const response = await axios.post(backendUrl + '/api/product/add', formData, { headers: { token } })

      if (response.data.success) {
        toast.success("Product Added")
        console.log(response);
        
        setName('')
        setDescription('')
        setPrice('')
        setCategory('')
        setSubCategory("")
        setSizes([])
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setBestseller(false)
        location.reload()
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }

  }


  return (
    <div>
      <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>

        <div>
          <p className='text-xl font-semibold text-gray-600 mt-[-2.5vh]'>Upload Image</p>
          <div className='flex gap-4 mt-2'>
            <label htmlFor="image1">
              <img className='w-[80px] h-[60px] sm:h-[85px] rounded-sm cursor-pointer transition-all duration-200 hover:scale-110 hover:shadow-md' src={image1 ? URL.createObjectURL(image1) : assets.upload_area} alt="" />
              <input onChange={(e) => setImage1(e.target.files[0])} type="file" id='image1' hidden />
            </label>
            <label htmlFor="image2">
              <img className='w-[80px] h-[60px] sm:h-[85px] rounded-sm cursor-pointer transition-all duration-200 hover:scale-110 hover:shadow-md' src={image2 ? URL.createObjectURL(image2) : assets.upload_area} alt="" />
              <input onChange={(e) => setImage2(e.target.files[0])} type="file" id='image2' hidden />
            </label>

            <label htmlFor="image3">
              <img className='w-[80px] h-[60px] sm:h-[85px] rounded-sm cursor-pointer transition-all duration-200 hover:scale-110 hover:shadow-md' src={image3 ? URL.createObjectURL(image3) : assets.upload_area} alt="" />
              <input onChange={(e) => setImage3(e.target.files[0])} type="file" id='image3' hidden />
            </label>

            <label htmlFor="image4">
              <img className='w-[80px] h-[60px] sm:h-[85px] rounded-sm cursor-pointer transition-all duration-200 hover:scale-110 hover:shadow-md' src={image4 ? URL.createObjectURL(image4) : assets.upload_area} alt="" />
              <input onChange={(e) => setImage4(e.target.files[0])} type="file" id='image4' hidden />
            </label>
          </div>
        </div>

        <div className='w-full'>
          <p className='text-xl font-semibold text-gray-600'>Produt name</p>
          <input onChange={(e) => setName(e.target.value)} className='w-full max-w-[370px] h-8 outline-none pl-3 border border-gray-300 mt-2 rounded-md transition-all duration-200 hover:shadow-md hover:scale-105' type="text" placeholder='Type here...' required />
        </div>

        <div className='w-full'>
          <p className='text-xl font-semibold text-gray-600'>Produt Description</p>
          <textarea onChange={(e) => setDescription(e.target.value)} className='w-full max-w-[370px] h-14 outline-none pl-3 pt-2 border border-gray-300 mt-2 rounded-md transition-all duration-200 hover:shadow-md hover:scale-105' type="text" placeholder='Type content here...' required />
        </div>

        <div className='w-full max-w-[370px] flex flex-col'>
          <p className='text-xl font-semibold text-gray-600'>Produt category</p>
          <div className='w-full flex justify-between mt-2'>
            <div onClick={() => setCategory((prev) => prev.includes("Men") ? "" : "Men")} className={`sm:w-24 w-20 h-8 rounded-md text-md font-semibold flex items-center justify-center border ${category === "Men" ? 'border-black' : 'border-gray-300'} transition-all duration-200 hover:bg-gray-50 bg-white hover:scale-105 hover:shadow-md cursor-pointer`}>Men</div>
            <div onClick={() => setCategory((prev) => prev.includes("Women") ? "" : "Women")} className={`sm:w-24 w-20 h-8 rounded-md text-md font-semibold flex items-center justify-center border ${category === "Women" ? 'border-black' : 'border-gray-300'} transition-all duration-200 hover:bg-gray-50 bg-white hover:scale-105 hover:shadow-md cursor-pointer`}>Women</div>
            <div onClick={() => setCategory((prev) => prev.includes("Kids") ? "" : "Kids")} className={`sm:w-24 w-20 h-8 rounded-md text-md font-semibold flex items-center justify-center border ${category === "Kids" ? 'border-black' : 'border-gray-300'} transition-all duration-200 hover:bg-gray-50 bg-white hover:scale-105 hover:shadow-md cursor-pointer`}>Kids</div>
          </div>
        </div>

        <div className='w-full max-w-[370px] flex flex-col'>
          <p className='text-xl font-semibold text-gray-600'>Sub category</p>
          <div className='w-full flex justify-between mt-2'>
            <div onClick={() => setSubCategory((prev) => prev.includes("Topwear") ? "" : "Topwear")} className={`sm:w-24 w-[90px] h-8 rounded-md text-[13px] sm:text-sm font-semibold flex items-center justify-center ${SubCategory === "Topwear" ? 'border-black' : 'border-gray-300'} border transition-all duration-200 hover:bg-gray-50 bg-white hover:scale-105 hover:shadow-md cursor-pointer`}>Topwear</div>
            <div onClick={() => setSubCategory((prev) => prev.includes("Bottomwear") ? "" : "Bottomwear")} className={`sm:w-24 w-[90px] h-8 rounded-md text-[13px] sm:text-sm font-semibold flex items-center justify-center ${SubCategory === "Bottomwear" ? 'border-black' : 'border-gray-300'} border transition-all duration-200 hover:bg-gray-50 bg-white hover:scale-105 hover:shadow-md cursor-pointer`}>Bottomwear</div>
            <div onClick={() => setSubCategory((prev) => prev.includes("Winterwear") ? "" : "Winterwear")} className={`sm:w-24 w-[90px] h-8 rounded-md text-[13px] sm:text-sm font-semibold flex items-center justify-center ${SubCategory === "Winterwear" ? 'border-black' : 'border-gray-300'} border transition-all duration-200 hover:bg-gray-50 bg-white hover:scale-105 hover:shadow-md cursor-pointer`}>Winterwear</div>
          </div>
        </div>

        <div className='w-full'>
          <p className='text-xl font-semibold text-gray-600'>Produt Price</p>
          <input onChange={(e) => setPrice(e.target.value)} className='w-full max-w-[370px] h-10 outline-none pl-3 border border-gray-300 mt-2 rounded-md transition-all duration-200 hover:shadow-md hover:scale-105' type="number" placeholder='Price...' required />
        </div>

        <div className='w-full max-w-[370px] flex flex-col'>
          <p className='text-xl font-semibold text-gray-600'>Product Size</p>
          <div className='w-full flex justify-between mt-2'>
            <div onClick={() => setSizes(prev => prev.includes("S") ? prev.filter((item) => item !== "S") : [...prev, "S"])} className={`sm:min-w-12 min-w-[50px] h-8 rounded-md text-sm font-semibold flex items-center justify-center border ${sizes.includes("S") ? 'border-black' : 'border-gray-300'} transition-all duration-200 hover:bg-gray-50 bg-white hover:scale-105 hover:shadow-md cursor-pointer`} >S</div>
            <div onClick={() => setSizes(prev => prev.includes("M") ? prev.filter((item) => item !== "M") : [...prev, "M"])} className={`sm:min-w-14 min-w-[50px] h-8 rounded-md text-sm font-semibold flex items-center justify-center border ${sizes.includes("M") ? 'border-black' : 'border-gray-300'} transition-all duration-200 hover:bg-gray-50 bg-white hover:scale-105 hover:shadow-md cursor-pointer`} >M</div>
            <div onClick={() => setSizes(prev => prev.includes("L") ? prev.filter((item) => item !== "L") : [...prev, "L"])} className={`sm:min-w-14 min-w-[50px] h-8 rounded-md text-sm font-semibold flex items-center justify-center border ${sizes.includes("L") ? 'border-black' : 'border-gray-300'} transition-all duration-200 hover:bg-gray-50 bg-white hover:scale-105 hover:shadow-md cursor-pointer`}>L</div>
            <div onClick={() => setSizes(prev => prev.includes("XL") ? prev.filter((item) => item !== "XL") : [...prev, "XL"])} className={`sm:min-w-14 min-w-[50px] h-8 rounded-md text-sm font-semibold flex items-center justify-center border ${sizes.includes("XL") ? 'border-black' : 'border-gray-300'} transition-all duration-200 hover:bg-gray-50 bg-white hover:scale-105 hover:shadow-md cursor-pointer`}>XL</div>
            <div onClick={() => setSizes(prev => prev.includes("XXL") ? prev.filter((item) => item !== "XXL") : [...prev, "XXL"])} className={`sm:min-w-14 min-w-[50px] h-8 rounded-md text-sm font-semibold flex items-center justify-center border ${sizes.includes("XXL") ? 'border-black' : 'border-gray-300'} transition-all duration-200 hover:bg-gray-50 bg-white hover:scale-105 hover:shadow-md cursor-pointer`} >XXL</div>
          </div>
        </div>

        <div className='w-full flex gap-2 mt-[[80px]px]'>
          <input onChange={() => setBestseller(prev => !prev)} className='cursor-pointer' checked={bestseller} type="checkbox" />
          <p className='font-medium text-gray-500'>Add to bestseller</p>
        </div>

        <div className='w-full max-w-[370px]'>
          <button onClick={(e) => console.log(name, description, price, category, SubCategory, image1, image2, image3, image4)

          } type='submit' className='w-full h-10 bg-black hover:bg-gray-900 text-white text-md font-medium cursor-pointer rounded-md'>Add Product</button>
        </div>
      </form >
    </div >
  )
}

export default Add