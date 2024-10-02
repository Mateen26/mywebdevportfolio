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
    <div className="container mt-20 mx-auto grid h-full gap-10 min-h-[60vh] w-full grid-cols-1 items-center lg:grid-cols-2 px-6">
    <div className="row-start-2 lg:row-auto">
      <div className="mb-4 lg:text-5xl !leading-tight text-3xl font-bold bg-gray-800 animate-pulse h-10 w-3/4"></div>
      <div className="mb-4 !text-gray-800 md:pr-16 xl:pr-28 bg-gray-800 animate-pulse h-6 w-full"></div>
      <div className="grid">
        <span className="mb-2 text-gray-800 font-medium bg-gray-800 animate-pulse h-4 w-1/4"></span>
        <div className="mb-2 flex w-full flex-col gap-4 md:w-10/12 md:flex-row">
          <div className="bg-gray-800 animate-pulse h-10 w-full md:w-[12rem]"></div>
        </div>
      </div>
      <div className="font-normal !text-gray-800 bg-gray-800 animate-pulse h-4 w-1/2"></div>
    </div>
    <div className="h-[36rem] w-full rounded-xl bg-gray-800 animate-pulse"></div>
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
          <div key={idx} className="border border-gray-700 rounded-lg overflow-hidden shadow-sm lg:h-[32rem] flex flex-col">
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