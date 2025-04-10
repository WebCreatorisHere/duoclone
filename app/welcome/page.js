import React from 'react'
import { Suspense } from 'react'
import Welcome from '../components/welcome'


const page = () => {
  return (
      <Suspense fallback={<div className='w-full h-screen flex justify-center items-center'></div>}>
      <Welcome/>
      </Suspense>
  )
}

export default page