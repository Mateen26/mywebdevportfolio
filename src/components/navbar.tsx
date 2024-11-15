import React, { useState, useEffect } from "react";
import {
  XMarkIcon,
  Bars3Icon,
} from "@heroicons/react/24/solid";
import logo from "../../public/image/mateen-rajput-high-resolution-logo.svg"
import Image from "next/image";
import Link from 'next/link';
import { motion } from "framer-motion";
import { animateScroll as scroll } from 'react-scroll';

export function Navbar() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen((cur) => !cur);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) setOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleScrollToContact = () => {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      scroll.scrollTo(contactForm.offsetTop, {
        duration: 1200,
        delay: 0,
        smooth: 'easeInQuad',
      });
      setOpen(false);
    }
  };

  const scrollToTop = () => {
    scroll.scrollToTop({
      duration: 1500,
      delay: 0,
      smooth: 'easeInOutQuart'
    });
  };

  return (
    <nav className="border-0 sticky top-0 z-50 !bg-primary-black shadow py-4 px-6 md:px-12">
      <div className="absolute inset-0 filter blur-sm !bg-primary-black" />
      <div className="container mx-auto flex items-center justify-between relative z-10 mt-2">
        <motion.div
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1 }}
        >
          <Link href="/">
            <Image 
              src={logo} 
              alt="logo" 
              width={200} 
              onClick={scrollToTop}
              height={200} 
              style={{ cursor: 'pointer' }}
            />
          </Link>
        </motion.div>
        
        {/* Desktop button */}
        <div className="hidden items-center gap-2 lg:flex">
          <motion.div
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1 }}
          >
            <button 
              onClick={handleScrollToContact} 
              className="bg-primary-brown text-white px-4 py-2 rounded cursor-pointer hover:bg-primary-brown/90 transition-colors"
            >
              Let&apos;s Connect
            </button>
          </motion.div>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={handleOpen}
          className="ml-auto inline-block lg:hidden"
        >
          {open ? (
            <XMarkIcon strokeWidth={2} className="h-6 w-6 text-primary-white" />
          ) : (
            <Bars3Icon strokeWidth={2} className="h-6 w-6 text-primary-white" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <div 
        className={`lg:hidden overflow-hidden duration-300 ease-in-out ${
          open ? 'max-h-[500px] opacity-100 visible' : 'max-h-0 opacity-0 invisible'
        }`}
      >
        <div className="container mx-auto relative">
          <div className="py-4 border-t border-gray-700/50 mt-4">
            <button
              onClick={handleScrollToContact}
              className="w-full bg-primary-brown text-white px-4 py-2 rounded cursor-pointer hover:bg-primary-brown/90 transition-colors"
            >
              Let&apos;s Connect
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
