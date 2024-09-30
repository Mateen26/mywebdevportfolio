"use client";

import { ProjectCard } from "@/components";
import { Typography } from "@material-tailwind/react";
import { motion } from "framer-motion"; // Add this import

const PROJECTS = [
  {
    img: "/image/blog-1.svg",
    title: "React Native Mobile App",
    desc: "Developed a cross-platform mobile app using React Native for seamless user experience on both iOS and Android.",
  },
  {
    img: "/image/blog2.svg",
    title: "NextJS E-commerce Platform",
    desc: "Built a high-performance e-commerce website using NextJS, integrating Typescript for improved code quality.",
  },
  {
    img: "/image/blog3.svg",
    title: "Tailwind CSS Portfolio",
    desc: "Designed and implemented a responsive portfolio website using Tailwind CSS for rapid UI development.",
  },
  {
    img: "/image/blog4.svg",
    title: "Firebase Real-time Chat App",
    desc: "Created a real-time chat application using ReactJS and Firebase, showcasing serverless development skills.",
  },
  {
    img: "/image/blog-1.svg",
    title: "Supabase-powered Blog",
    desc: "Developed a full-stack blog platform using Supabase for backend services and NextJS for the frontend.",
  },
  {
    img: "/image/blog2.svg",
    title: "Sanity.io Headless CMS",
    desc: "Implemented a content management system using Sanity.io, integrated with a ReactJS frontend for dynamic content.",
  },
  {
    img: "/image/blog3.svg",
    title: "Agile Project Management Dashboard",
    desc: "Built a project management dashboard using ReactJS and integrated with JIRA API for agile workflow visualization.",
  },
  {
    img: "/image/blog4.svg",
    title: "Webflow to React Migration",
    desc: "Successfully migrated a Webflow-designed website to a custom ReactJS application, improving performance and maintainability.",
  },
];

export function Projects() {
  return (
    <section className="py-28 px-8">
      <div className="container mx-auto mb-20 text-center">
        <h2 className="mb-4 text-primary-brown">
          My Projects
        </h2>
        <p className="mx-auto w-full px-4 font-normal !text-gray-500 lg:w-6/12">
          Whether you have a mobile app idea that needs to come to life or a
          website that requires a facelift, I&apos;m here to turn your digital
          dreams into reality.
        </p>
      </div>
      <div className="container mx-auto grid grid-cols-1 gap-x-10 gap-y-20 md:grid-cols-2 xl:grid-cols-4">
        {PROJECTS.map((props, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5, delay: idx * 0.1 }} // Animation on scroll
          >
            <ProjectCard {...props} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Projects;
