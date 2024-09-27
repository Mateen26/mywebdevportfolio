import React from 'react';

export const HeroSectionSkeleton = () => {
  return (
    <div className="container mt-10 mx-auto grid h-full gap-10 min-h-[60vh] w-full grid-cols-1 items-center lg:grid-cols-2 px-6">
      <div className="row-start-2 lg:row-auto">
        <div className="mb-4 lg:text-5xl !leading-tight text-3xl font-bold bg-gray-600 animate-pulse h-10 w-3/4"></div>
        <div className="mb-4 !text-gray-600 md:pr-16 xl:pr-28 bg-gray-600 animate-pulse h-6 w-full"></div>
        <div className="grid">
          <span className="mb-2 text-gray-600 font-medium bg-gray-600 animate-pulse h-4 w-1/4"></span>
          <div className="mb-2 flex w-full flex-col gap-4 md:w-10/12 md:flex-row">
            <div className="bg-gray-600 animate-pulse h-10 w-full md:w-[12rem]"></div>
          </div>
        </div>
        <div className="font-normal !text-gray-600 bg-gray-600 animate-pulse h-4 w-1/2"></div>
      </div>
      <div className="h-[36rem] w-full rounded-xl bg-gray-600 animate-pulse"></div>
    </div>
  );
};
