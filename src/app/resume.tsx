"use client";

import React, { useEffect, useState } from "react";
import { fetchDataFromSanity } from "./sanityClient";
import { motion } from "framer-motion";
// import { ResumeSectionSkeleton } from "../components/Skeletons";

function Resume() {
  const [jobExperiences, setJobExperiences] = useState<any>(null);
  console.log(jobExperiences, "jobExperiences");
  useEffect(() => {
    const fetchData = async () => {
      const query = '*[_type == "jobExperience"] | order(startDate desc)';
      const result = await fetchDataFromSanity(query);
      setJobExperiences(result);
    };

    fetchData();
  }, []);

  if (!jobExperiences) return "loading";

  return (
    <section className="py-12  bg-primary-black px-6">
      <div className="container  mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
        >
          <h2 className="lg:text-4xl font-bold mb-4 text-primary-brown text-2xl">
            My Professional Journey
          </h2>
          <p className="text-lg mb-8 text-gray-300">
            With {calculateExperience(jobExperiences)} years of experience in web development,
            I&apos;ve had the opportunity to work on diverse projects and grow my skillset.
          </p>
          <button className="inline-flex items-center text-primary-white hover:text-gray-300 transition-colors">
            View Full Resume
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Array.isArray(jobExperiences) && jobExperiences.map((job: any, idx: number) => (
            <motion.div
              key={job._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-primary-gray p-6 rounded-lg shadow-lg border border-primary-brown "
            >
              <h3 className="text-2xl font-semibold mb-2 text-primary-white">{job.position}</h3>
              <h4 className="text-lg font-medium mb-4 text-primary-brown">{job.companyName}</h4>
              <div className="flex items-center gap-2 mb-4 text-primary-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>
                  {formatDate(job.startDate)} - {job.isPresent ? 'Present' : formatDate(job.endDate)}
                </span>
              </div>
              <p className="mb-8 text-gray-300">{job.description}</p>
              
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function calculateExperience(jobs: any[]) {
  if (!jobs || jobs.length === 0) return 0;
  const earliestStartDate = Math.min(...jobs.map((job: any) => new Date(job.startDate).getTime()));
  const latestEndDate = Math.max(...jobs.map((job: any) => job.endDate ? new Date(job.endDate).getTime() : Date.now()));
  return ((latestEndDate - earliestStartDate) / (1000 * 60 * 60 * 24 * 365)).toFixed(1);
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export default Resume;
