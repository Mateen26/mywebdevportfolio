import React from 'react';
import { Link as ScrollLink } from 'react-scroll';

// components
import { Navbar, Footer } from "@/components";

// sections
import Hero from "./hero";
import Clients from "./clients";
import Skills from "./skills";
import Projects from "./projects";
import Resume from "./resume";
import Testimonial from "./testimonial";
import PopularClients from "./popular-clients";
import ContactForm from "./contact-form";
import Script from 'next/script';

export default function Portfolio() {
  return (
    <>
      <div id="smooth-wrapper">
      <div id="smooth-content">
      <Navbar />
      <Hero />
      <Clients />
      <Skills />
      <Projects />
      <Resume />
      <Testimonial />
      {/* <PopularClients /> */}
      <div id="contact-form">
        <ContactForm />
      </div>
      <Footer />
      </div>
      </div>
      <Script
        src="/assets/js/ScrollTrigger.min.js"
        strategy="beforeInteractive"
      />
      <Script
        src="/assets/js/ScrollSmoother.min.js"
        strategy="beforeInteractive"
      />
    </>
  );
}
