"use client";

import {
  Radio,
  Input,
  Textarea,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { EnvelopeIcon, PhoneIcon, TicketIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion"; // Add this import
import React, { useState } from 'react';

export function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    type: 'Design',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('Message sent successfully!');
        setFormData({ firstName: '', lastName: '', email: '', type: 'Design', message: '' });
      } else {
        setSubmitStatus('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact-form" className="px-8 py-16">
      <div className="container mx-auto mb-20 text-center">
        <h1 className="mb-4 text-primary-brown">
          Contact Us
        </h1>
        <p className="mx-auto w-full lg:w-5/12 !text-gray-500">
          Ready to get started? Feel free to reach out through the contact form,
          and let&apos;s embark on a journey of innovation and success.
        </p>
      </div>
      <div className="container mx-auto border border-gray/50">
        <motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-7 md:gap-10">
            <div className="w-full col-span-3 rounded-lg h-full py-8 p-5 md:p-16 bg-gray-900">
              <h4 className="mb-2 text-primary-brown">
                Contact Information
              </h4>
              <p className="mx-auto mb-8 text-base !text-gray-500">
                Fill up the form and our Team will get back to you within 24
                hours.
              </p>
              <div className="flex gap-5">
                <PhoneIcon className="h-6 w-6 text-primary-brown" />
                <h6 className="mb-2 text-primary-brown">
                  +92 343-3287156
                </h6>
              </div>
              <div className="flex my-2 gap-5">
                <EnvelopeIcon className="h-6 w-6 text-primary-brown" />
                  <h6 className="mb-2 text-primary-brown">
                  mateenrajput55@gmail.com
                </h6>
              </div>
           
            </div>
            <div className="w-full mt-8 md:mt-0 md:px-10 col-span-4 h-full p-5">
              <form onSubmit={handleSubmit}>
                <div className="mb-8 grid gap-4 lg:grid-cols-2">
                  {/* @ts-ignore */}
                  <Input
                    color="gray"
                    size="lg"
                    variant="static"
                    label="First Name"
                    name="firstName"
                    placeholder="eg. Lucas"
                    containerProps={{
                      className: "!min-w-full mb-3 md:mb-0",
                    }}
                    className="text-primary-brown "
                    labelProps={{
                      className: "!text-primary-white before:border-primary-white after:border-primary-white peer-focus:!text-primary-brown peer-focus:before:!border-primary-brown peer-focus:after:!border-primary-brown"
                    }}
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                  {/* @ts-ignore */}
                  <Input
                    color="gray"
                    size="lg"
                    variant="static"
                    label="Last Name"
                    name="lastName"
                    placeholder="eg. Jones"
                    containerProps={{
                      className: "!min-w-full",
                    }}
                    className="text-primary-brown"
                    labelProps={{
                      className: "!text-primary-white before:border-primary-white after:border-primary-white peer-focus:!text-primary-brown peer-focus:before:!border-primary-brown peer-focus:after:!border-primary-brown"
                    }}
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
                {/* @ts-ignore */}
                <Input
                  color="gray"
                  size="lg"
                  variant="static"
                  label="Email"
                  name="email"
                  placeholder="eg. lucas@mail.com"
                  containerProps={{
                    className: "!min-w-full mb-8",
                  }}
                  className="text-primary-brown"
                  labelProps={{
                    className: "!text-primary-white before:border-primary-white after:border-primary-white peer-focus:!text-primary-brown peer-focus:before:!border-primary-brown peer-focus:after:!border-primary-brown"
                  }}
                  value={formData.email}
                  onChange={handleChange}
                />
                <p className="!text-primary-brown text-sm mb-2">
                  What are you interested in?
                </p>
                <div className="-ml-3 mb-14 ">
                  {/* @ts-ignore */}
                  <Radio
                    color="brown"
                    name="type"
                    label="Design"
                    defaultChecked
                    className="text-primary-brown"
                    labelProps={{
                      className: "!text-primary-white peer-checked:!text-primary-brown"
                    }}
                  />
                  {/* @ts-ignore */}
                  <Radio 
                    color="brown" 
                    name="type" 
                    label="Development"
                    className="text-primary-brown"
                    labelProps={{
                      className: "!text-primary-white peer-checked:!text-primary-brown"
                    }}
                  />
                  {/* @ts-ignore */}
                  <Radio 
                    color="brown" 
                    name="type" 
                    label="Support"
                    className="text-primary-brown"
                    labelProps={{
                      className: "!text-primary-white peer-checked:!text-primary-brown"
                    }}
                  />
                  {/* @ts-ignore */}
                  <Radio 
                    color="brown"  
                    name="type" 
                    label="Other"
                    className="text-primary-brown"
                    labelProps={{
                      className: "!text-primary-white peer-checked:!text-primary-brown"
                    }}
                  />
                </div>
                {/* @ts-ignore */}
                <Textarea
                  className="text-primary-brown"
                  color="brown"
                  size="lg"
                  variant="static"
                  label="Your Message"
                  name="message"
                  containerProps={{
                    className: "!min-w-full mb-8",
                  }}
                  labelProps={{
                    className: "!text-primary-white before:border-primary-white after:border-primary-white peer-focus:!text-primary-brown peer-focus:before:!border-primary-brown peer-focus:after:!border-primary-brown"
                  }}
                  value={formData.message}
                  onChange={handleChange}
                />
                <div className="w-full flex justify-end">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full md:w-fit text-white bg-primary-brown px-2 py-2 rounded-sm"
                  >
                    {isSubmitting ? 'Sending...' : 'Send message'}
                  </button>
                  {submitStatus && <p className="mt-4 text-center">{submitStatus}</p>}
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default ContactForm;
