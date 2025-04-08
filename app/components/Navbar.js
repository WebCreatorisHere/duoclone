import React from 'react'
import Greenbutton from './greenbutton'

const Navbar = () => {
  return (
    <nav className='flex justify-between items-center p-3 px-[10%] bg-white shadow-md'>
        <div className="logo"><img src="svgs/logo.svg" alt="Duolingo" /></div>
        <Greenbutton>Get Started</Greenbutton>
    </nav>
  )
}

export default Navbar