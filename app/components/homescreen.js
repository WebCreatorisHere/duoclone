import React from 'react'
import Greenbutton from './greenbutton'

const Homescreen = () => {
  return (
    <section className='flex justify-center items-center h-screen overflow-y-hidden bg-[#f7f9f9]'>
       <div className='w-[50%] flex justify-end items-center mb-15 h-full '>
          <img src="svgs/homescreen.svg" alt="Duolingo" className='w-[70%]' />
          
       </div>

       <div className='w-[50%] flex flex-col justify-center h-full pb-20 items-center gap-10'>
          <p className='font-extrabold text-3xl text-center w-[80%] text-[#4B4B4B]'>The free, fun, and effective way to learn a language!</p>
          <div className='flex flex-col gap-3'>
          <Greenbutton>Get Started</Greenbutton>
          <button className='uppercase border-2 border-b-4 text-[#1CB0F6] font-extrabold rounded-xl border-[#E5E5E5] p-2.5 px-16'>I Already have an account</button>
          </div>
            

       </div>
    </section>
  )
}

export default Homescreen