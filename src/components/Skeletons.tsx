import React from 'react';
import { motion } from 'framer-motion';

const WindParticle = ({ delay }: { delay: number }) => (
  <motion.div
    className="absolute h-1 bg-white opacity-50"
    style={{
      left: '-10%',
      top: `${Math.random() * 100}%`,
      width: `${Math.random() * 60 + 10}%`,
    }}
    animate={{
      x: ['0%', '110%'],
      opacity: [0, 0.5, 0],
    }}
    transition={{
      duration: Math.random() * 2 + 2,
      ease: "linear",
      repeat: Infinity,
      delay: delay,
    }}
  />
);

export const WindAnimation = () => {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-primary-black">
      {[...Array(10)].map((_, i) => (
        <WindParticle key={i} delay={0} />
      ))}
    </div>
  );
};


export const HeroSectionSkeleton = () => {
  return (
    <div className="bg-primary-black p-8 lg:mt-20">
      <div className="container mx-auto grid h-full gap-10 min-h-[60vh] w-full grid-cols-1 items-center lg:grid-cols-2">
        <div className="order-1 lg:order-1">
          {/* Title skeleton */}
          <div className="mb-4 lg:text-5xl !leading-tight text-3xl font-bold">
            <div className="h-12 lg:h-16 bg-primary-brown/20 rounded-lg w-3/4 animate-pulse" />
          </div>

          {/* Bio text skeleton */}
          <div className="mb-4 md:pr-16 xl:pr-28">
            <div className="h-6 bg-gray-700/20 rounded w-full animate-pulse" />
            <div className="h-6 bg-gray-700/20 rounded w-3/4 mt-2 animate-pulse" />
          </div>

          {/* Email input section skeleton */}
          <div className="grid mb-4">
            <div className="mb-2 h-5 bg-primary-brown/20 rounded w-24 animate-pulse" />
            <div className="mb-2 flex w-full flex-col gap-4 md:w-10/12 md:flex-row">
              <div className="h-12 bg-gray-700/20 rounded w-full animate-pulse" />
              <div className="h-12 bg-primary-brown/20 rounded w-full md:w-[12rem] animate-pulse" />
            </div>
          </div>

          {/* Terms link skeleton */}
          <div className="flex items-center gap-2">
            <div className="h-5 bg-gray-700/20 rounded w-16 animate-pulse" />
            <div className="h-5 bg-primary-brown/20 rounded w-32 animate-pulse" />
          </div>
        </div>

        {/* Image skeleton */}
        <div className="order-2 lg:order-2">
          <div className="h-[36rem] w-full rounded-xl bg-gray-700/20 animate-pulse" />
        </div>
      </div>
    </div>
  );
};


export const ProjectsSkeleton = () => {
  return (
    <section className="py-28 px-8">
      <div className="container mx-auto mb-20 text-center">
        <div className="mb-4 h-8 w-48 mx-auto bg-gray-800 animate-pulse rounded"></div>
        <div className="mx-auto w-full px-4 lg:w-6/12">
          <div className="h-4 bg-gray-800 animate-pulse rounded mb-2"></div>
          <div className="h-4 bg-gray-800 animate-pulse rounded mb-2"></div>
          <div className="h-4 bg-gray-800 animate-pulse rounded"></div>
        </div>
      </div>
      <div className="container mx-auto grid grid-cols-1 gap-x-5 gap-y-10 md:grid-cols-2 xl:grid-cols-4">
        {[...Array(8)].map((_, idx) => (
          <div key={idx} className="border border-gray-700 rounded-lg overflow-hidden shadow-sm lg:h-[29rem] flex flex-col">
            <div className="mx-0 mt-0 mb-6 h-48 bg-gray-800 animate-pulse"></div>
            <div className="p-4 flex flex-col flex-grow">
              <div className="h-6 bg-gray-800 animate-pulse rounded mb-2"></div>
              <div className="h-4 bg-gray-800 animate-pulse rounded mb-2"></div>
              <div className="h-4 bg-gray-800 animate-pulse rounded mb-2"></div>
              <div className="h-4 bg-gray-800 animate-pulse rounded mb-6"></div>
              <div className="mt-auto">
                <div className="h-10 bg-gray-800 animate-pulse rounded w-28"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};


// ... existing imports and components ...

export const TestimonialSkeleton = () => {
  return (
    <section className="py-12 px-8 lg:py-24">
      <div className="container max-w-screen-lg mx-auto">
        <div className="container mx-auto mb-20 text-center">
          <div className="mb-4 h-8 w-48 mx-auto bg-gray-800 animate-pulse rounded"></div>
          <div className="mx-auto w-full px-4 lg:w-8/12">
            <div className="h-4 bg-gray-800 animate-pulse rounded mb-2"></div>
            <div className="h-4 bg-gray-800 animate-pulse rounded"></div>
          </div>
        </div>
        <div className="py-8 lg:flex-row">
          <div className="w-full lg:gap-10 h-full lg:flex justify-between">
            <div className="w-full mb-10 lg:mb-0">
              <div className="mb-4 h-6 w-48 bg-gray-800 animate-pulse rounded"></div>
              <div className="mb-3 w-full lg:w-8/12">
                <div className="h-4 bg-gray-800 animate-pulse rounded mb-2"></div>
                <div className="h-4 bg-gray-800 animate-pulse rounded mb-2"></div>
                <div className="h-4 bg-gray-800 animate-pulse rounded"></div>
              </div>
              <div className="mb-0.5 h-5 w-32 bg-gray-800 animate-pulse rounded"></div>
              <div className="mb-5 h-4 w-40 bg-gray-800 animate-pulse rounded"></div>
              <div className="flex items-center gap-4">
                {[...Array(3)].map((_, index) => (
                  <React.Fragment key={index}>
                    <div className="w-12 h-12 rounded-full bg-gray-800 animate-pulse"></div>
                    {index < 2 && <div className="w-[1px] h-[36px] bg-gray-800"></div>}
                  </React.Fragment>
                ))}
              </div>
            </div>
            <div className="h-[21rem] rounded-lg w-full sm:w-[18rem] shrink-0 bg-gray-800 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};