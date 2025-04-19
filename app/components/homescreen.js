"use client"
import React from 'react'
import Greenbutton from './greenbutton'
import { useRouter } from 'next/navigation'

const Homescreen = () => {
   const router = useRouter()
  return (
    <section className='flex justify-center max-[800px]:flex-col items-center h-screen overflow-y-hidden bg-[#f7f9f9]'>
       <div className='w-[50%] max-[550px]:w-[80%] max-[800px]:w-[60%] cursor-pointer flex justify-end items-center  max-[800px]:-mb-6 mb-15 h-full '>
          <img src="svgs/homescreen.svg" alt="Duolingo" className='w-[70%] max-[950px]:w-[90%] ' />
          
       </div>

       <div className='w-[50%] max-[800px]:justify-start max-[800px]:w-[80%] max-[550px]:w-full flex flex-col justify-center h-full pb-20 items-center gap-10'>
          <p className='font-extrabold  text-3xl text-center w-[80%] max-[800px]:w-[95%] text-[#4B4B4B]'>The free, fun, and effective way to learn a language!</p>
          <div className='flex flex-col gap-3'>
          <Greenbutton>Get Started</Greenbutton>
          <button onClick={()=>router.push("/login-signup?login=true")} className='uppercase max-[550px]:text-sm max-[550px]:font-black cursor-pointer active:mt-0.5 active:border-b-2 border-2 border-b-4 text-[#1CB0F6] font-extrabold rounded-xl border-[#E5E5E5] p-2.5 px-16'>I Already have an account</button>
          </div>
            

       </div>
    </section>
  )
}

export default Homescreen