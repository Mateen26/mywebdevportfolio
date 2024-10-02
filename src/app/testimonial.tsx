"use client";

import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { fetchDataFromSanity, sanityClient } from "./sanityClient";
import imageUrlBuilder from '@sanity/image-url';
import { TestimonialSkeleton } from "@/components/Skeletons";

const builder = imageUrlBuilder(sanityClient);

function urlFor(source: any) {
  return builder.image(source);
}

export function Testimonial() {
  const [active, setActive] = useState(0);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isChanging, setIsChanging] = useState(false);

  const nextTestimonial = useCallback(() => {
    setIsChanging(true);
    setTimeout(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
      setIsChanging(false);
    }, 300); 
  }, [testimonials.length]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = '*[_type == "testimonial"]';
        const result = await fetchDataFromSanity(query);
        setTestimonials(result);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (testimonials.length > 0) {
      const interval = setInterval(nextTestimonial, 3000);
      return () => clearInterval(interval);
    }
  }, [testimonials.length, nextTestimonial]);

  if (loading) {
    return <TestimonialSkeleton />;
  }

  return (
    <section className="py-12 px-8 lg:py-24">
      <div className="container max-w-screen-lg mx-auto">
        <div className="container mx-auto mb-20 text-center">
          <h2 className="mb-4 text-primary-brown text-2xl font-bold">
            What Clients Say
          </h2>
          <p className="mx-auto w-full px-4 font-normal !text-gray-500 lg:w-8/12">
            Discover what clients have to say about their experiences working
            with me. Their satisfaction is my greatest achievement!
          </p>
        </div>
        <motion.div
          className="py-8 lg:flex-row"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="w-full lg:gap-10 h-full lg:flex justify-between">
            <div className="w-full mb-10 lg:mb-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="mb-4 font-bold lg:max-w-xs text-blue-gray">
                    {testimonials[active]?.title}
                  </h3>
                  <p className="mb-3 w-full lg:w-8/12 font-normal !text-gray-500">
                    {testimonials[active]?.description}
                  </p>
                  <h6 className="mb-0.5 text-blue-gray">
                    {testimonials[active]?.clientName}
                  </h6>
                  <p className="font-normal mb-5 !text-gray-500">
                    {testimonials[active]?.clientPosition}
                  </p>
                </motion.div>
              </AnimatePresence>
              <div className="flex items-center gap-4">
                {testimonials.map((testimonial, index) => (
                  <React.Fragment key={testimonial._id}>
                    <div
                      className={`cursor-pointer w-12 h-12 rounded-full overflow-hidden border-2 border-gray-300 ${active === index ? "opacity-100" : "opacity-50"
                        }`}
                      onClick={() => setActive(index)}
                    >
                      <Image
                        src={urlFor(testimonial.image).url()}
                        alt={`avatar${index + 1}`}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {index < testimonials.length - 1 && (
                      <div className="w-[1px] h-[36px] bg-blue-gray-100"></div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
            <div className="h-[21rem] rounded-lg w-full sm:w-[18rem] shrink-0 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className={`h-full w-full transition-all duration-300 ${isChanging ? 'blur-md' : 'blur-none'}`}
                >
                  <Image
                    width={768}
                    height={768}
                    alt="testimonial image"
                    src={urlFor(testimonials[active]?.image).url()}
                    className="h-full w-full object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Testimonial;
