"use client";
import React, { useState ,useEffect} from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn ,useSession} from "next-auth/react";

const Login_Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const { data: session } = useSession()
  const searchParams = useSearchParams();
  const [completed, setcompleted] = useState(false)
  const [login, setlogin] = useState(true)
  const [iziToast, setiziToast] = useState(null)
  const router = useRouter()

  const handleonsubmit = (data) => {
    console.log(data);
  };
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    const login = searchParams.get("login")
    if(!login)return
    if(login === "true"){
      setlogin(true)
    }
    else{
      setlogin(false)
    }
  }, [searchParams])

  useEffect(() => {
    const loadizitoast = async()=>{
      let izitoastmodule = (await import("izitoast")).default
      setiziToast(izitoastmodule)
    }
    loadizitoast()
  }, [])
  

  useEffect(() => {
    if(session && !completed)router.push("/createaccount")
    else if(session && completed)router.push("/learn")
    else return 
  }, [session])
  
  const loginprovider = async (provider) => {
    setcompleted(true)
    try{signIn(provider)
}
 catch(error){
  iziToast.error({
    title: 'Error',
    message: 'Something went wrong!',
    position: 'topRight',
  });
 }
  }

  const signupprovider = async (provider) => {
    setcompleted(false)
    try{
      signIn(provider)
}
 catch(error){
  iziToast.error({
    title: 'Error',
    message: 'Something went wrong!',
    position: 'topRight',
  });
  setcompleted(false)
 }
  }

  
  
  return (
    <>
    {login && <main>
        <button className="p-2 absolute left-7 top-7 cursor-pointer">
          <img src="svgs/close.svg" alt="Close" />
        </button>
        <button onClick={()=>router.push("?login=false")} className="uppercase absolute right-7.5 top-7.5  border-2 active:mt-0.5 hover:brightness-90 bg-white active:border-b-2 p-2.5 text-[#1CB0F6] font-extrabold border-b-4 cursor-pointer  border-[#e5e5e5] px-6 rounded-xl">
          Sign up
        </button>

      <section className="w-[30%] mx-auto flex flex-col items-center py-8 justify-center">
        <form
          className="w-full h-fit flex flex-col gap-5"
          onSubmit={handleSubmit(handleonsubmit)}
        >
          <h1 className="font-extrabold text-[#3C3C3C] text-center py-4 text-2xl">Log in</h1>

          <div>
            <input
              className="w-full p-2 px-3 caret-[#1CB0F6] text-xl placeholder:text-[#777777]  bg-white font-medium brightness-97 focus:outline-none focus:border-[#1CB0F6] border-2 border-[#E5E5E5] rounded-xl"
              placeholder="Email"
              style={{borderColor:errors.loginemail?"#FF4B4B":""}}
              {...register("loginemail", {
                required: "Email is required",
              })}
              type="email"
            />
            {errors.loginemail && (
              <p className="text-red-500 font-semibold flex gap-1 items-center justify-start mt-1"><img className="w-6" src='svgs/error.svg' alt="Error: "/>{errors.loginemail.message}</p>
            )}
          </div>
          <div className="relative">
            <input
              className="w-full p-2 px-3 caret-[#1CB0F6] text-xl placeholder:text-[#777777]  bg-white font-medium brightness-97 focus:outline-none focus:border-[#1CB0F6] border-2 border-[#E5E5E5] rounded-xl"
              placeholder="Password"
              style={{borderColor:errors.loginpassword?"#FF4B4B":""}}
              {...register("loginpassword", {
                required: "Password is required",
                maxLength: {
                  value: 20,
                  message: "Password cannot exceed 20 characters",
                },
                minLength: {
                  value: 5,
                  message: "Password must be at least 5 characters",
                },
              })}
              type={showPassword ? "text" : "password"}
            />
            {errors.loginpassword && (
              <p className="text-red-500 font-semibold flex gap-1 items-center justify-start mt-1"><img className="w-6" src='svgs/error.svg' alt="Error: "/>{errors.loginpassword.message}</p>
            )}
              <button
              type="button"
              className="absolute cursor-pointer right-3 top-2"
              onClick={() => setShowPassword(!showPassword)}
              >
              <img
                className="w-8"
                src={showPassword ? "svgs/eye.svg" : "svgs/eyeclosed.svg"}
                alt="Toggle visibility"
              />
            </button>
          </div>

          <button
            type="submit"
            
            className="bg-[#1CB0F6] active:mt-1 hover:brightness-110 uppercase relative active:border-none p-2.5 text-white font-extrabold border-b-4 cursor-pointer  border-[#1899D6] px-16 rounded-[14px]"
          >
            Log in
          </button>
        </form>

        <div className="py-7.5 w-full h-fit">
          <div className="seperation relative h-[2px] w-full bg-[#e5e5e5] ">
            <p className="absolute top-0 -translate-y-1/2 px-2 z-10 font-bold left-[calc(50%-10px)] w-fit bg-white text-[#AFAFAF]">
              Or
            </p>
          </div>
        </div>

        <div className="providers w-full flex flex-col gap-3 h-fit">
          <button
            type="button"
            onClick={()=>loginprovider("facebook")}
            className="bg-white active:mt-0.5 w-full hover:brightness-90 flex items-center justify-center gap-2.5 uppercase active:border-b-2 p-2.5 text-[#3B5998] font-extrabold border-b-4 border-2 cursor-pointer  border-[#E5E5E5] px-16 rounded-[14px]"
          >
            <img className="w-3" src="svgs/facebook.svg" alt="f" />
            Facebook
          </button>
          <button
            type="button"
            onClick={()=>loginprovider("google")}
            className="bg-white active:mt-0.5 w-full hover:brightness-90 flex items-center justify-center gap-2.5 uppercase active:border-b-2 p-2.5 text-[#4285F4] font-extrabold border-b-4 border-2 cursor-pointer  border-[#E5E5E5] px-16 rounded-[14px]"
          >
            <img className="w-6" src="svgs/google.svg" alt="f" />
            Google
          </button>
        </div>

        <p className="font-semibold text-sm text-[#afafaf] text-center mt-9">By signing in to Duolingo, you agree to our Terms and Privacy Policy.</p>
      </section>
    </main>}


    {!login && <main>
        <button className="p-2 absolute left-7 top-7 cursor-pointer">
          <img src="svgs/close.svg" alt="Close" />
        </button>
        <button onClick={()=>router.push("?login=true")} className="uppercase absolute right-7.5 top-7.5  border-2 active:mt-0.5 hover:brightness-90 bg-white active:border-b-2 p-2.5 text-[#1CB0F6] font-extrabold border-b-4 cursor-pointer  border-[#e5e5e5] px-6 rounded-xl">
          Log in
        </button>

      <section className="w-[30%] mx-auto flex flex-col items-center py-8 justify-center">
        <form
          className="w-full h-fit flex flex-col gap-5"
          onSubmit={handleSubmit(handleonsubmit)}
        >
          <h1 className="font-extrabold text-[#3C3C3C] text-center py-4 text-2xl">Create your profile</h1>

          <div>
            <input
              className="w-full p-2 px-3 caret-[#1CB0F6] text-xl placeholder:text-[#777777]  bg-white font-medium brightness-97 focus:outline-none focus:border-[#1CB0F6] border-2 border-[#E5E5E5] rounded-xl"
              placeholder="Age"
              style={{borderColor:errors.age?"#FF4B4B":""}}
              {...register("age", {
                required: "Age is required",
                maxLength: {
                  value: 2,
                  message: "Age cannot exceed 2 digits",
                },
                minLength: {
                  value: 1,
                  message: "Age must be at least 1 digit",
                },
              })}
              type="number"
            />
            {errors.age && 
              <p className="text-red-500 font-semibold flex gap-1 items-center justify-start mt-1"><img className="w-6" src='svgs/error.svg' alt="Error: "/>{errors.age.message}</p>
            }

           {!errors.age && <p className="font-semibold px-0.5 text-base text-[#777777]">
              Providing your age ensures you get the right Duolingo experience.
            </p>
          }
          </div>
          <div>
            <input
              className="w-full p-2 px-3 caret-[#1CB0F6] text-xl placeholder:text-[#777777]  bg-white font-medium brightness-97 focus:outline-none focus:border-[#1CB0F6] border-2 border-[#E5E5E5] rounded-xl"
              placeholder="Name"
              style={{borderColor:errors.name?"#FF4B4B":""}}
              {...register("name", {
                required: "Name is required",
                maxLength: {
                  value: 20,
                  message: "Name cannot exceed 20 characters",
                },
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters",
                },
              })}
              type="text"
            />
            {errors.name && (
              <p className="text-red-500 font-semibold flex gap-1 items-center justify-start mt-1"><img className="w-6" src='svgs/error.svg' alt="Error: "/>{errors.name.message}</p>
            )}
          </div>
          <div>
            <input
              className="w-full p-2 px-3 caret-[#1CB0F6] text-xl placeholder:text-[#777777]  bg-white font-medium brightness-97 focus:outline-none focus:border-[#1CB0F6] border-2 border-[#E5E5E5] rounded-xl"
              placeholder="Email"
              style={{borderColor:errors.email?"#FF4B4B":""}}
              {...register("email", {
                required: "Email is required",
              })}
              type="email"
            />
            {errors.email && (
              <p className="text-red-500 font-semibold flex gap-1 items-center justify-start mt-1"><img className="w-6" src='svgs/error.svg' alt="Error: "/>{errors.email.message}</p>
            )}
          </div>
          <div className="relative">
            <input
              className="w-full p-2 px-3 caret-[#1CB0F6] text-xl placeholder:text-[#777777]  bg-white font-medium brightness-97 focus:outline-none focus:border-[#1CB0F6] border-2 border-[#E5E5E5] rounded-xl"
              placeholder="Password"
              style={{borderColor:errors.password?"#FF4B4B":""}}
              {...register("password", {
                required: "Password is required",
                maxLength: {
                  value: 20,
                  message: "Password cannot exceed 20 characters",
                },
                minLength: {
                  value: 5,
                  message: "Password must be at least 5 characters",
                },
              })}
              type={showPassword ? "text" : "password"}
            />
            {errors.password && (
              <p className="text-red-500 font-semibold flex gap-1 items-center justify-start mt-1"><img className="w-6" src='svgs/error.svg' alt="Error: "/>{errors.password.message}</p>
            )}
            <button
              type="button"
              className="absolute cursor-pointer right-3 top-2"
              onClick={() => setShowPassword(!showPassword)}
            >
              <img
                className="w-8"
                src={showPassword ? "svgs/eye.svg" : "svgs/eyeclosed.svg"}
                alt="Toggle visibility"
              />
            </button>
          </div>

          <button
            type="submit"
            className="bg-[#1CB0F6] active:mt-1 hover:brightness-110 uppercase relative active:border-none p-2.5 text-white font-extrabold border-b-4 cursor-pointer  border-[#1899D6] px-16 rounded-[14px]"
          >
            Create Account
          </button>
        </form>

        <div className="py-7.5 w-full h-fit">
          <div className="seperation relative h-[2px] w-full bg-[#e5e5e5] ">
            <p className="absolute top-0 -translate-y-1/2 px-2 z-10 font-bold left-[calc(50%-10px)] w-fit bg-white text-[#AFAFAF]">
              Or
            </p>
          </div>
        </div>

        <div className="providers w-full flex flex-col gap-3 h-fit">
          <button
            type="button"
            onClick={()=>signupprovider("facebook")}
            className="bg-white active:mt-0.5 w-full hover:brightness-90 flex items-center justify-center gap-2.5 uppercase active:border-b-2 p-2.5 text-[#3B5998] font-extrabold border-b-4 border-2 cursor-pointer  border-[#E5E5E5] px-16 rounded-[14px]"
          >
            <img className="w-3" src="svgs/facebook.svg" alt="f" />
            Facebook
          </button>
          <button
            type="button"
            onClick={()=>signupprovider("google")}
            className="bg-white active:mt-0.5 w-full hover:brightness-90 flex items-center justify-center gap-2.5 uppercase active:border-b-2 p-2.5 text-[#4285F4] font-extrabold border-b-4 border-2 cursor-pointer  border-[#E5E5E5] px-16 rounded-[14px]"
          >
            <img className="w-6" src="svgs/google.svg" alt="f" />
            Google
          </button>
        </div>

        <p className="font-semibold text-sm text-[#afafaf] text-center mt-9">By signing in to Duolingo, you agree to our Terms and Privacy Policy.</p>
      </section>
    </main>}
    </>
  );
};

export default Login_Signup;