"use client";

import React from "react";
import Image from "next/image";
import { Avatar } from "@material-tailwind/react";
import { motion } from "framer-motion"; // Add this import

export function Testimonial() {
  const [active, setActive] = React.useState(3);

  return (
    <section className="py-12 px-8 lg:py-24">
      <div className="container max-w-screen-lg mx-auto">
        <div className="container mx-auto mb-20 text-center">
          <h2 className="mb-4 text-blue-gray">
            What Clients Say
          </h2>
          <p className="mx-auto w-full px-4 font-normal !text-gray-500 lg:w-8/12">
            Discover what clients have to say about their experiences working
            with me. My client&apos;s satisfaction is my greatest achievement!
          </p>
        </div>
        <motion.div 
          className="py-8 lg:flex-row"
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 1 }} // Animation on appear
        >
          <div className="w-full lg:gap-10 h-full lg:flex justify-between">
            <div className="w-full mb-10 lg:mb-0">
              <h3 className="mb-4 font-bold lg:max-w-xs text-blue-gray">
                Mobile App Development
              </h3>
              <p className="mb-3 w-full lg:w-8/12 font-normal !text-gray-500">
                I had the pleasure of working with Lily on a critical web
                development project, and I can confidently say that their
                expertise and professionalism exceeded my expectations.
              </p>
              <h6 className="mb-0.5 text-blue-gray">
                Michael - Technical Manager
              </h6>
              <p className="font-normal mb-5 !text-gray-500">
                Marketing @ APPLE INC.
              </p>
              <div className="flex items-center gap-4">
                <Avatar
                  variant="rounded"
                  src="/image/avatar1.jpg"
                  alt="avatar1"
                  size="sm"
                  className={`cursor-pointer ${
                    active === 1 ? "opacity-100" : "opacity-50"
                  }`}
                  onClick={() => setActive(1)}
                />
                <div className="w-[1px] h-[36px] bg-blue-gray-100"></div>
                <Avatar
                  variant="rounded"
                  src="/image/avatar2.jpg"
                  alt="avatar2"
                  size="sm"
                  className={`cursor-pointer ${
                    active === 2 ? "opacity-100" : "opacity-50"
                  }`}
                  onClick={() => setActive(2)}
                />
                <div className="w-[1px] h-[36px] bg-blue-gray-100" />
                <Avatar
                  variant="rounded"
                  src="/image/avatar3.jpg"
                  alt="avatar3"
                  size="sm"
                  className={`cursor-pointer ${
                    active === 3 ? "opacity-100" : "opacity-50"
                  }`}
                  onClick={() => setActive(3)}
                />
              </div>
            </div>
            <div className="h-[21rem] rounded-lg w-full sm:w-[18rem] shrink-0">
              <Image
                width={768}
                height={768}
                alt="testimonial image"
                src={`/image/avatar${active}.jpg`}
                className="h-full rounded-lg w-full object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Testimonial;
