"use client";
import React from "react";
import { useRouter } from "next/navigation";

const Greenbutton = ({ children }) => {
  const router = useRouter();
  const handleclick = () => {
    router.push("/register");
  };
  return (
    <button onClick={handleclick} className="bg-[#58CC02] uppercase active:border-none active:mt-1 p-2.5 text-white font-extrabold border-b-4 cursor-pointer  border-[#58A700] px-16 rounded-xl">
      {children}
    </button>
  );
};

export default Greenbutton;
