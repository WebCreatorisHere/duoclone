"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { useSession , signOut} from 'next-auth/react'

const Page = () => {
    const {data:session} = useSession()
    const router = useRouter()
    
    if(session){
        return (
            <div className='flex flex-col items-center justify-center h-screen'>
                <h1 className='text-3xl font-bold'>Welcome {session.user.name}</h1>
                <p className='text-xl'>You are logged in</p>
                <button onClick={() => signOut()} className='bg-blue-500 cursor-pointer text-white px-4 py-2 rounded mt-4'>Sign Out</button>
            </div>
        )
    }
    else{
        return (
            <div className='flex flex-col items-center justify-center h-screen'>
                <h1 className='text-3xl font-bold'>You are not logged in</h1>
                <p className='text-xl'>Please log in to access this page</p>
                <button onClick={() => router.push("/login-signup?login=true")} className='bg-blue-500 cursor-pointer text-white px-4 py-2 rounded mt-4'>Goc Back to Login</button>
            </div>
        )
    }
}

export default Page