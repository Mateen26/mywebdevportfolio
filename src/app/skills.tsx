"use client";

import { Typography } from "@material-tailwind/react";
import {
  RectangleGroupIcon,
  FingerPrintIcon,
  SwatchIcon,
  HashtagIcon,
  EyeIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/solid";
import { SkillCard } from "@/components";
import { motion, useAnimation } from "framer-motion"; // Add this import
import { useEffect } from "react";
import { useInView } from 'react-intersection-observer'; // Update import
import { 
  FaReact, 
  FaHtml5, 
  FaCss3Alt, 
  FaJs, 
  FaSass 
} from 'react-icons/fa';
import { 
  SiNextdotjs, 
  SiTypescript, 
  SiTailwindcss, 
  SiCypress, 
  SiFirebase, 
  SiSupabase, 
  SiSanity, 
  SiWebflow 
} from 'react-icons/si';

const SKILLS = [
  {
    icon: RectangleGroupIcon,
    title: "Frontend Web Development:",
    children:
      "Creating beautiful and functional web experiences is my forte. Using the latest technologies and best practices, I design and build websites that captivate and engage users.",
  },
  {
    icon: FingerPrintIcon,
    title: "Mobile App Development",
    children:
      " I specialize in creating responsive and intuitive mobile apps that work seamlessly across iOS & Android devices. From concept to deployment, I handle every stage of the development process.",
  },
  {
    icon: SwatchIcon,
    title: "Technology Stack",
    children:
      "I'm well-versed in the industry's most popular frontend technologies, including HTML5, CSS3, JavaScript, and frameworks like React and React Native.",
  },
  {
    icon: HashtagIcon,
    title: " Web Optimization",
    children:
      "Performance matters. I optimize websites and apps for speed, ensuring your users enjoy a fast and responsive experience, which in turn boosts user satisfaction and SEO rankings.",
  },
  {
    icon: EyeIcon,
    title: "User-Centric Design",
    children:
      "My development goes hand-in-hand with an eye for design. I create user interfaces that are not only functional but also aesthetically pleasing, providing a seamless and enjoyable user journey.",
  },
  {
    icon: DocumentTextIcon,
    title: "Testing and Quality Assurance",
    children:
      "I rigorously test and debug applications to guarantee a bug-free and secure environment for users. Your peace of mind is as important to me as the functionality of your project.",
  },
];

const TECH_SKILLS = [
  { icon: FaReact, name: 'ReactJS', color: '#61DAFB' },
  { icon: SiNextdotjs, name: 'NextJS', color: '#ffffff' },
  { icon: SiCypress, name: 'Cypress', color: '#ffffff' },
  { icon: FaJs, name: 'Javascript', color: '#F7DF1E' },
  { icon: SiTypescript, name: 'Typescript', color: '#3178C6' },
  { icon: FaReact, name: 'React Native', color: '#61DAFB' },
  { icon: FaSass, name: 'SCSS', color: '#CC6699' },
  { icon: SiTailwindcss, name: 'Tailwind', color: '#06B6D4' },
  { icon: FaHtml5, name: 'HTML5', color: '#E34F26' },
  { icon: FaCss3Alt, name: 'CSS3', color: '#1572B6' },
  { icon: SiFirebase, name: 'Firebase', color: '#FFCA28' },
  { icon: SiSupabase, name: 'Supabase', color: '#3ECF8E' },
  { icon: SiSanity, name: 'Sanity.io', color: '#F03E2F' },
  { icon: SiWebflow, name: 'Webflow', color: '#4353FF' },
];

const dropAndBounceVariants = {
  hidden: { 
    y: -100,
    opacity: 0 
  },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.6,
      duration: 2,
      delay: Math.random() * 0.5, // Random delay between 0 and 0.5 seconds
    }
  })
};

export function Skills() {
  // Separate refs for each section
  const [skillsRef, skillsInView] = useInView({
    threshold: 0,
  });
  
  const [techRef, techInView] = useInView({
    threshold: 0.1, // Adjust this value to control when the animation triggers
  });

  const control = useAnimation();

  useEffect(() => {
    if (skillsInView) {
      control.start("visible");
    } else {
      control.start("hidden");
    }
  }, [control, skillsInView]);

  return (
    <section className="px-8 mt-20">
      <div className="container mx-auto mb-20" ref={techRef}>
        <h2 className="text-center mb-12 font-bold uppercase text-primary-brown text-2xl">
          Technologies I Work With
        </h2>
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8 justify-items-center"
          initial="hidden"
          animate={techInView ? "visible" : "hidden"}
        >
          {TECH_SKILLS.map((tech, idx) => (
            <motion.div
              key={idx}
              className="flex flex-col items-center gap-2"
              variants={dropAndBounceVariants}
              custom={idx}
              whileHover={{ 
                scale: 1.1,
                transition: { duration: 0.2 }
              }}
            >
              <tech.icon 
                className="w-12 h-12 transition-colors" 
                style={{ color: tech.color }}
              />
              <span className="text-sm text-gray-600">{tech.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
       <div className="container mx-auto mb-20 text-center">
      <h2 className="mb-2 font-bold uppercase text-primary-brown text-2xl">
          my skills
        </h2>
        <h1 className="mb-4 text-blue-gray">
          What I do
        </h1>
        <p className="mx-auto w-full !text-gray-500 lg:w-10/12">
          I&apos;m not just a developer; I&apos;m a digital dreamweaver.
          Crafting immersive online experiences is not just a job but my
          calling. Discover below how I can help you.
        </p>
      </div>
      <div 
        className="container mx-auto grid grid-cols-1 gap-y-10 gap-x-5 md:grid-cols-2 lg:grid-cols-3" 
        ref={skillsRef}
      >
        {SKILLS.map((props, idx) => (
          <motion.div 
            key={idx}
            initial="hidden"
            animate={skillsInView ? "visible" : "hidden"}
            variants={{
              visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: idx * 0.2 } },
              hidden: { opacity: 0, scale: 0 }
            }} 
          >
            <SkillCard {...props} inView={skillsInView}/>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Skills;
