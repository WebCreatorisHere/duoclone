"use client"
import React from 'react'
import { useState,useEffect } from 'react'
import { useRouter } from 'next/navigation'

const Registermain = () => {
    const [languages,setlanguages] = useState([
        {country: "spain", title: "Spanish", para: "50.01M learners"},
        {country: "france", title: "French", para: "30.21M learners"},
        {country: "japan", title: "Japanese", para: "60.11M learners"},
        {country: "germany", title: "German", para: "80.01M learners"},
        {country: "korea", title: "Korean", para: "100.31M learners"},
        {country: "korea", title: "Korean", para: "100.31M learners"},
        {country: "korea", title: "Korean", para: "100.31M learners"},
        {country: "korea", title: "Korean", para: "100.31M learners"},
        {country: "korea", title: "Korean", para: "100.31M learners"},
    ])
    const router = useRouter()
  return (
    <main className='w-full h-screen pt-16'>
        <nav className='flex fixed z-100 top-0 left-0 w-full justify-start items-center p-3 px-[10%] bg-white shadow-md'>
        <div className="logo"><img src="svgs/logo.svg" alt="Duolingo" /></div>
    </nav>

    <section className='w-full h-[calc(100vh-66px)] py-18 flex  items-center flex-col'>

    <p className='font-extrabold text-3xl text-center w-[80%] text-[#4B4B4B]'>I want to learn...</p>    
    <div className="drawer flex gap-5 mt-16 flex-wrap w-full px-[10%] mx-auto justify-center ">
       {languages && languages.map((language,index)=>{
        return <div onClick={()=>{router.push(language.country)}} key={index} className=' w-[200px] h-[217px] gap-2.5 border-2 border-b-4 hover:brightness-90 cursor-pointer border-[#E5E5E5] rounded-xl flex flex-col items-center justify-center bg-white'>
        <img src={`svgs/${language.country}.svg`} alt={`${language.country}`} className='w-20' />
        <h1 className='text-[#4b4b4b] text-lg font-extrabold mt-4 -mb-2'>{language.title}</h1>
        <p className='text-[#777777] font-semibold'>{language.para}</p>
    </div>
       })}
    </div>
    </section>
    </main>
  )
}

export default Registermain