// @ts-nocheck
"use client";

import Image from "next/image";
import { Typography } from "@material-tailwind/react";
import { motion } from "framer-motion"; // Add this import

const CLIENTS = [
  "UNODC.webp",
  "cipher.png",
  "travelot.png",
  "deltacron.png"
];

export function Clients() {
  return (
    <section className="px-8 py-20">
      <div className="container mx-auto text-center">
        <h6 
          className="mb-8 text-2xl font-bold text-primary-brown" 
        >
          My Employers 
        </h6>
        <div className="flex flex-wrap items-center justify-center gap-6">
          {CLIENTS.map((logo, key) => (
            <motion.div 
              key={key}
              initial={{opacity: 0 }} 
              whileInView={{
                opacity: 1, 
              }}
              viewport={{
                margin: "-100px",
              }}
              className="lg:px-20"
            >
              <Image
                alt={logo}
                width={768}
                height={768}
                className="w-40"
                src={`/logos/logo-${logo}`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Clients;
