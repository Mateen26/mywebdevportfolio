"use client";

import { ProjectCard } from "@/components";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { fetchDataFromSanity, sanityClient } from "./sanityClient";
import imageUrlBuilder from '@sanity/image-url';
import { ProjectsSkeleton } from "@/components/Skeletons";
import { useMediaQuery } from 'react-responsive';

const builder = imageUrlBuilder(sanityClient);

function urlFor(source: any) {
  return builder.image(source);
}

export function Projects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const isDesktop = useMediaQuery({ minWidth: 1024 });

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
    <section className="py-28 px-8 md:px-12" id="projects">
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
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-5 gap-y-10 relative">
        <AnimatePresence>
          {projects.map((project, index) => (
            <motion.div
              key={project._id}
              layout
              initial={false}
              animate={isDesktop ? { 
                gridColumn: selectedId === project._id ? "1 / -1" : "auto",
                gridRow: selectedId === project._id ? `${Math.floor(index / 4) + 1}` : "auto",
                opacity: selectedId && selectedId !== project._id ? 0.3 : 1,
                scale: selectedId && selectedId !== project._id ? 0.95 : 1,
              } : {
                opacity: selectedId && selectedId !== project._id ? 0.3 : 1,
                scale: selectedId && selectedId !== project._id ? 0.95 : 1,
              }}
              transition={{
                type: "spring",
                stiffness: 350,
                damping: 25,
                opacity: { duration: 0.2 }
              }}
              style={{ 
                zIndex: selectedId === project._id ? 10 : 1,
                originY: 0,
                gridColumn: isDesktop && selectedId === project._id ? "1 / -1" : "auto"
              }}
            >
              <ProjectCard
                img={project.image ? urlFor(project.image).url() : ''}
                images={project.images?.map((img: any) => urlFor(img).url()) || []}
                title={project.title}
                desc={project.shortDescription}
                longDescription={project.longDescription}
                isExpanded={selectedId === project._id}
                onClick={() => {
                  if (selectedId === project._id) {
                    setSelectedId(null);
                  } else {
                    setSelectedId(project._id);
                  }
                }}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}

export default Projects;
