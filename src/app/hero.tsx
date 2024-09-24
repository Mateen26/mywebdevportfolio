"use client";

import Image from "next/image";
import { Input, Button } from "@material-tailwind/react";
import { fetchDataFromSanity, sanityClient } from "./sanityClient";
import { useEffect } from "react";
import { motion } from "framer-motion"; // Add this import
function Hero() {


  useEffect(() => {
    newthing()
  
   
  }, [])
  
  const newthing = async () => {
    const query = '*[]'; 
    const data = await fetchDataFromSanity(query);
    console.log(data,"data from sanity")
  }

  return (
    <motion.header 
      className="bg-primary-black p-8 mt-10"
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 1 }} // Animation on appear
    >
      <div className="container mx-auto grid h-full gap-10 min-h-[60vh] w-full grid-cols-1 items-center lg:grid-cols-2">
        <div className="row-start-2 lg:row-auto">
          <h1 className="mb-4 lg:text-5xl !leading-tight text-3xl font-bold text-primary-white"> {/* Updated text color */}
            Welcome to my Web <br /> Development Portfolio!
          </h1>
          <p className="mb-4 !text-primary-white md:pr-16 xl:pr-28"> {/* Updated text color */}
            I&apos;m Mateen Rajput, a passionate web developer based in USA. Here,
            you&apos;ll get a glimpse of my journey in the world of web
            development, where creativity meets functionality.
          </p>
          <div className="grid">
            <span className="mb-2 text-primary-white font-medium"> {/* Updated text color */}
              Your email
            </span>
            <div className="mb-2 flex w-full flex-col gap-4 md:w-10/12 md:flex-row">
              {/* @ts-ignore */}
              <Input color="gray" label="Enter your email" size="lg" />
              <button color="gray" className="w-full px-4 md:w-[12rem]">
                require offer
              </button>
            </div>
          </div>
          <p className="font-normal !text-primary-white"> {/* Updated text color */}
            Read my{" "}
            <a href="#" className="font-medium underline transition-colors text-primary-white"> {/* Updated text color */}
              Terms and Conditions
            </a>
          </p>
        </div>
        <Image
          width={1024}
          height={1024}
          alt="team work"
          src="/image/dev-pic.jpg"
          className="h-[36rem] w-full rounded-xl object-cover"
        />
      </div>
    </motion.header>
  );
}

export default Hero;
