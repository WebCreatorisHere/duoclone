"use client"
import React from 'react'
import { useState , useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';

const CreateAccount = ()=>{
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const router = useRouter()
    const { data: session,status } = useSession()
    const {register,handleSubmit,formState:{errors,isSubmitting}} = useForm()

  
    useEffect(() => {
      if (status === "loading") return; // Do nothing while loading
      if(!session)router.push("/login-signup?login=false")
    }, [session,status,router])
    
    const OnhandleSubmit = async(data) => {
      if(data.password == data.confirmedpassword){
      let a = await fetch("/api/create",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({...data,email:session?.user?.email})
      })
      let res = await a.json()
      if(res.status == 200){
        router.push("/learn")
      }
    }
    else{
      alert("Passwords do not match")
    }
    };
  
    return (
      <section className="flex flex-col items-center justify-center w-full h-[628px]">
      <h1 className="font-bold my-2 text-[42px] max-[950px]:text-[36px] max-[950px]:leading-[36px] max-[450px]:text-[30px] max-[900px]:my-10 max-[450px]:leading-[30px]">
        Create Your Account
      </h1>
    
      <form
        onSubmit={handleSubmit(OnhandleSubmit)}
        className="flex flex-col gap-4 w-[50%] max-[900px]:w-full max-[900px]:px-24 max-[600px]:px-6"
      >
        <div>
        {errors.name && (
          <p style={{ color: "#FF6369" ,fontWeight:"900",fontSize:"14px"}}>{errors.name.message}</p>
        )}
        <input
          placeholder="Enter your Name*"
          className="w-full bg-[#f6f7f5] p-4 outline-none border rounded-lg border-[#9a9a9a]"
          {...register("name", {
          required: { value: true, message: "Name is required" },
          minLength: { value: 3, message: "Name must be at least 3 characters" },
          })}
          type="text"
        />
        </div>
    
        <div>
        {errors.age && (
          <p style={{ color: "#FF6369" ,fontWeight:"900",fontSize:"14px"}}>{errors.age.message}</p>
        )}
        <input
          placeholder="Enter your Age*"
          className="w-full bg-[#f6f7f5] p-4 outline-none border rounded-lg border-[#9a9a9a]"
          {...register("age", {
          required: { value: true, message: "Age is required" },
          min: { value: 1, message: "Age must be a positive number" },
          })}
          type="number"
        />
        </div>
    
        <div className="relative">
        {errors.password && (
          <p style={{ color: "#FF6369" ,fontWeight:"900",fontSize:"14px"}}>{errors.password.message}</p>
        )}
        <input
          placeholder="Create your Password*"
          className="w-full bg-[#f6f7f5] p-4 pr-12 outline-none border rounded-lg border-[#9a9a9a]"
          {...register("password", {
          required: { value: true, message: "Password is required" },
          minLength: { value: 6, message: "Password must be at least 6 characters" },
          })}
          type={showPassword ? "text" : "password"}
        />
        <img
          width="30"
          className="absolute right-4 bottom-[14px] cursor-pointer z-50"
          alt="Toggle view"
          src={!showPassword ? "svgs/eyeclosed.svg" : "svgs/eye.svg"}
          onClick={() => setShowPassword(!showPassword)}
        />
        
        </div>
    
        <div className="relative">
        {errors.confirmedpassword && (
          <p style={{ color: "#FF6369" ,fontWeight:"900",fontSize:"14px"}}>{errors.confirmedpassword.message}</p>
        )}
        <input
          placeholder="Confirm your Password*"
          className="w-full bg-[#f6f7f5] p-4 pr-12 outline-none border rounded-lg border-[#9a9a9a]"
          {...register("confirmedpassword", {
          required: { value: true, message: "Please confirm your password" },
          
          })}
          type={showConfirm ? "text" : "password"}
        />
        <img
          width="30"
          className="absolute right-4 bottom-[14px] cursor-pointer z-50"
          alt="Toggle view"
          src={!showConfirm ? "svgs/eyeclosed.svg" : "svgs/eye.svg"}
          onClick={() => setShowConfirm(!showConfirm)}
        />
        </div>
    
        <button
        className="bg-[#8129d9] disabled:bg-[#8129d9c8] cursor-pointer disabled:cursor-auto text-white p-3 font-semibold rounded-full"
        type="submit"
        disabled={isSubmitting}
        >
        Create Your Account
        </button>
      </form>
      </section>
    );
  }

export default CreateAccount