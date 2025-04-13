"use client";
import React, { act } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Greenbutton from "./greenbutton";
import Image from "next/image";

const Welcome = () => {
  const [progress, setprogress] = useState(0);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [answers, setanswers] = useState({});
  const [activeindex, setactiveindex] = useState(-1);
  const [currparam, setcurrparam] = useState("");
  const [questions, setquestions] = useState([
    {
      question: "What is the capital of France?",
      options: [
        "Tv",
        "Google search",
        "Tiktok",
        "Friends & Family",
        "Youtube",
        "Others",
      ],
      keyword: "reach",
    },
    {
      question: "Why you are doing this?",
      options: [
        "To travel more confidently",
        "To improve my career opportunities",
        "For school or university",
        "To connect with friends or family",
        "Just for fun",
        "To keep my brain sharp"
      ],
      keyword: "why",
    },
    {
      question: "what do you know about it!",
      options: [
        "I know nothing about it",
        "I know I tried it once",
        "I know I used it before",
        "I know a bit here and there",
        "I know it well — I use it often!"
      ]
      ,
      keyword: "level",
    },
  ]);

  useEffect(() => {
    setprogress(0);
    if (searchParams.toString() === "") {
      setprogress(25);
      setcurrparam("reach");
    }
    else if (searchParams.get("why") === "true") {
      setprogress(50);
      setcurrparam("why");
    } else if (searchParams.get("level") === "true") {
      setprogress(75);
      setcurrparam("level");
    } 
  }, [searchParams]);

  const handlecontinue = () => {
    if (currparam === "reach") {
      router.push("?why=true");
    } else if (currparam === "why") {
      router.push("?level=true");
    } else {
      localStorage.setItem("answers", JSON.stringify(answers));
      setprogress(100);
      router.push("/login-signup");
    }
    setactiveindex(-1);
  };

  const onoptionclick = (option) => {

    setanswers({ ...answers,[currparam]: option });
  };

  return (
    <main>
      <header className="flex flex-col justify-center w-full px-[6.25%] pb-6  items-center">
        <nav className="flex justify-center w-full gap-4 p-10.5  items-center">
          <button onClick={()=>router.back()} className=" backward cursor-pointer flex justify-center items-center">
            <img className="w-4.5" src="svgs/back.svg" alt="🔙" />
          </button>

          <div className="progressbar w-[95%] relative h-4 rounded-full bg-[#E5E5E5]">
            <div
              className="progress transition-all duration-500 delay-50 relative after:rounded-full after:w-[96.5%] after:absolute after:top-[4.5px] after:left-1 after:bg-[#79D635] after:h-[3.5px] h-full rounded-full bg-[#58CC02]"
              style={{ width: `${progress > 25 ? progress : 25}%` }}
            ></div>
          </div>
        </nav>

        <div className="questioning flex justify-start items-center w-full gap-6 px-20 -mt-2">
          <div className="teacher flex justify-center items-center">
            <img className="w-24" src="images/duo.png" alt="Q." />
          </div>
          <div className="questions relative w-full h-14">
            {questions.map((questionbox, index) => {
              let activated = false;
              if (questionbox.keyword == currparam) activated = true;
              return (
                <div
                  key={index}
                  className={`question ${
                    activated ? "scale-100" : "scale-0"
                  } origin-left transition-all duration-400 absolute font-semibold top-0 left-0 border-2 border-[#e5e5e5] rounded-xl p-4 py-3`}
                >
                  <img
                    className="absolute bottom-[9px] left-0 -translate-x-full"
                    src="svgs/chat.svg"
                    alt="h"
                  />
                  <p>{questionbox.question}?</p>
                </div>
              );
            })}
          </div>
        </div>
      </header>
      <section className="h-[43vh] relative w-[68%] mx-auto overflow-hidden">
        {questions.map((questionbox, mainindex) => {
          let activated = false;
          if (questionbox.keyword == currparam) activated = true;

          return (
            <div
              key={mainindex}
              className={`flex ${
                activated
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-full"
              } transition-all duration-500 justify-center overflow-y-scroll max-h-full scrollbar-hide items-center absolute top-0 left-0 w-full flex-wrap gap-4 mx-auto pb-6`}
            >
              {questionbox.options.map((option, index) => {
                return (
                  <div
                    onClick={() => {
                      onoptionclick(option);
                      setactiveindex(index);
                    }}
                    key={index}
                    className={`active:text-[#1899D6] w-[calc(50%-16px)] py-3.5 px-4 gap-4 border-2 active:bg-[#DDF4FF] active:border-[#84D8FF] ${
                      activeindex == index
                        ? "bg-[#DDF4FF] border-[#84D8FF] border-b-4 text-[#1899D6]"
                        : "text-[#4B4B4B] border-b-4 border-[#E5E5E5] bg-white"
                    } active:border-b-2   hover:brightness-95 cursor-pointer rounded-xl flex items-center justify-start`}
                  >
                    <Image
                      width={40}
                      height={40}
                      src="https://placehold.co/40x40"
                      alt="testing"
                    />
                    <p className="text-center  font-extrabold">{option}</p>
                  </div>
                );
              })}
            </div>
          );
        })}
      </section>

      <footer className="absolute bottom-0 left-0 w-full flex justify-end items-center py-11 bg-white border-t-2 border-[#e5e5e5] px-[7%]">
        <button
        disabled={activeindex == -1}
          onClick={handlecontinue}
          className="bg-[#58CC02] absolute disabled:bg-[#DDDDDD] disabled:text-[#999999] disabled:border-none uppercase active:border-none p-2.5 text-white font-extrabold border-b-4 cursor-pointer  border-[#58A700] px-10 rounded-2xl"
        >
          Continue
        </button>
      </footer>
    </main>
  );
};

export default Welcome;
