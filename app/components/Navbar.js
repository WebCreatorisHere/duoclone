"use client"
import React from 'react'
import Greenbutton from './greenbutton'
import { useRouter } from 'next/navigation'

const Navbar = () => {
  const router = useRouter()
  return (
    <nav className='flex justify-between items-center p-3 max-[550px]:justify-center px-[10%] bg-white shadow-md'>
        <div className="logo" onClick={()=>router.refresh()}><img src="svgs/logo.svg" alt="Duolingo" /></div>
        <button onClick={()=>router.push("/register")} className="bg-[#58CC02] max-[550px]:hidden uppercase active:border-none active:mt-1 p-2.5 text-white font-extrabold border-b-4 cursor-pointer  border-[#58A700] px-16 rounded-xl">
      Get Started
    </button>
    </nav>
  )
}

export default Navbar