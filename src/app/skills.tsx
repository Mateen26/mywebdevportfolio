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

export function Skills() {
  const control = useAnimation()
  const [ref, inView] = useInView({
    threshold: 0.1,
  }); 
  console.log(inView, "inView")
  useEffect(() => {
    if (inView) {
      control.start("visible");
    } 
    else {
      control.start("hidden");
    }
  }, [control, inView]);

  const boxVariant = {
    visible: { opacity: 1, scale: 1, x:0, transition: { duration: 0.5 } },
    hidden: { opacity: 0, scale: 0, x: 100 }
  };
  return (
    <section className="px-8 mt-40">
      <div className="container mx-auto mb-20 text-center" 
            >
        <h2 className="mb-2 font-bold uppercase text-blue-gray">
          my skills
        </h2>
        <h1 className="mb-4 text-blue-gray">
          What I do
        </h1>
        <p className="mx-auto w-full !text-gray-500 lg:w-10/12" 
           
            >
          I&apos;m not just a developer; I&apos;m a digital dreamweaver.
          Crafting immersive online experiences is not just a job but my
          calling. Discover below how I can help you.
        </p>
      </div>
      <div className="container mx-auto grid grid-cols-1 gap-y-10 gap-x-5 md:grid-cols-2 lg:grid-cols-3"  ref={ref}>
        {SKILLS.map((props, idx) => (
          <motion.div 
            key={idx}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={{
              visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: idx * 0.2 } },
              hidden: { opacity: 0, scale: 0 }
            }} 
          >
            <SkillCard {...props} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Skills;
