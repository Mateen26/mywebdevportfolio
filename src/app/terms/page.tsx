"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { TermsSkeleton } from '@/components/Skeletons/TermsSkeleton';
import { Navbar } from '@/components';

export default function TermsAndConditions() {
  const [isLoading, setIsLoading] = React.useState(true);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <>
        <Navbar />
        <TermsSkeleton />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-primary-black min-h-screen py-20 px-6 lg:px-8"
      >
        <div className="container mx-auto max-w-4xl">
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold text-primary-brown mb-8 text-center"
          >
            Terms and Conditions
          </motion.h1>

          <div ref={ref} className="space-y-8">
            <Section
              inView={inView}
              delay={0.3}
              title="1. Professional Services Agreement"
              content="As a freelance web developer, I provide professional web development services including but not limited to website design, development, maintenance, and consulting. By engaging my services, you agree to the terms outlined in this document."
            />

            <Section
              inView={inView}
              delay={0.4}
              title="2. Project Scope and Deliverables"
              content="Each project will be clearly defined in terms of scope, deliverables, timeline, and cost through a written agreement. Any changes to the project scope must be agreed upon in writing and may affect the timeline and cost."
            />

            <Section
              inView={inView}
              delay={0.5}
              title="3. Payment Terms"
              content="A 50% deposit is required to begin work, with the remaining balance due upon project completion. All payments are non-refundable. Late payments may incur additional fees and result in work suspension."
            />

            <Section
              inView={inView}
              delay={0.6}
              title="4. Intellectual Property Rights"
              content="Upon full payment, you will receive all rights to the final deliverables. However, I retain rights to display the work in my portfolio and for promotional purposes."
            />

            <Section
              inView={inView}
              delay={0.7}
              title="5. Communication and Feedback"
              content="Timely communication and feedback are essential for project success. Delays in providing feedback or required materials may impact project timelines."
            />

            <Section
              inView={inView}
              delay={0.8}
              title="6. Project Timeline"
              content="While every effort will be made to complete projects within agreed timeframes, delays may occur due to revisions, feedback cycles, or technical challenges. Regular updates will be provided throughout the project."
            />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-12 text-center"
          >
            <p className="text-gray-400 text-sm">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}

function Section({ title, content, inView, delay }: { 
  title: string; 
  content: string; 
  inView: boolean;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ delay, duration: 0.5 }}
      className="bg-primary-gray p-6 rounded-lg border border-primary-brown"
    >
      <h2 className="text-xl font-semibold text-primary-brown mb-4">{title}</h2>
      <p className="text-gray-300">{content}</p>
    </motion.div>
  );
} 