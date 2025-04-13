import React from 'react'
import { Suspense } from 'react'
import Login_Signup from '../components/login-signup'

const Login = () => {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}>
      
      <Login_Signup />
    </Suspense>
  )
}

export default Login