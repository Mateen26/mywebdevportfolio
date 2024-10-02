"use client";

import { ProjectCard } from "@/components";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { fetchDataFromSanity, sanityClient } from "./sanityClient";
import imageUrlBuilder from '@sanity/image-url';
import { ProjectsSkeleton } from "@/components/Skeletons";

const builder = imageUrlBuilder(sanityClient);

function urlFor(source: any) {
  return builder.image(source);
}

export function Projects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = '*[_type == "project"] | order(startDate desc)';
        const result = await fetchDataFromSanity(query);
        setProjects(result);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <ProjectsSkeleton />;
  }

  return (
    <section className="py-28 px-8">
      <div className="container mx-auto mb-20 text-center">
        <h2 className="mb-4 text-primary-brown text-2xl font-bold">
          My Projects
        </h2>
        <p className="mx-auto w-full px-4 font-normal !text-gray-500 lg:w-6/12">
          Whether you have a mobile app idea that needs to come to life or a
          website that requires a facelift, I&apos;m here to turn your digital
          dreams into reality.
        </p>
      </div>
      <div className="container mx-auto grid grid-cols-1 gap-x-5 gap-y-10 md:grid-cols-2 xl:grid-cols-4">
        {projects.map((project, idx) => (
          <motion.div 
            key={project._id}
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <ProjectCard
              img={project.image ? urlFor(project.image).url() : ''}
              title={project.title}
              desc={project.shortDescription}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Projects;
