import React from 'react';

export function TermsSkeleton() {
  return (
    <div className="bg-primary-black min-h-screen py-20 px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        <div className="h-12 bg-gray-700/20 rounded-lg w-72 mx-auto mb-12 animate-pulse" />
        
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div 
            key={i}
            className="bg-gray-700/20 p-6 rounded-lg mb-8 animate-pulse"
          >
            <div className="h-8 bg-gray-700/30 rounded w-3/4 mb-6" />
            <div className="space-y-3">
              <div className="h-4 bg-gray-700/30 rounded w-full" />
              <div className="h-4 bg-gray-700/30 rounded w-5/6" />
              <div className="h-4 bg-gray-700/30 rounded w-4/6" />
            </div>
          </div>
        ))}

        <div className="mt-12 flex justify-center">
          <div className="h-4 bg-gray-700/20 rounded w-48 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export default TermsSkeleton; 