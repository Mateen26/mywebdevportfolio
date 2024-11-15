"use client";

import {
  Radio,
  Input,
  Textarea,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { EnvelopeIcon, PhoneIcon, TicketIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import React, { useState } from 'react';

export function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    type: 'Design',
    message: '',
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | '';
    message: string;
  }>({ type: '', message: '' });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      firstName: '',
      lastName: '',
      email: '',
      message: '',
    };

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
      isValid = false;
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: 'Message sent successfully!'
        });
        setFormData({ firstName: '', lastName: '', email: '', type: 'Design', message: '' });
      } else {
        setSubmitStatus({
          type: 'error',
          message: 'Failed to send message. Please try again.'
        });
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus({
        type: 'error',
        message: 'An error occurred. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
      
      setTimeout(() => {
        setSubmitStatus({ type: '', message: '' });
      }, 5000);
    }
  };

  return (
    <section id="contact-form" className="px-8 py-16 md:px-12">
      <div className="container mx-auto mb-20 text-center">
        <h1 className="mb-4 text-primary-brown text-2xl font-bold">
          Contact Me
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
                  <div>
                    {/* @ts-ignore */}
                    <Input
                      color="gray"
                      size="lg"
                      variant="static"
                      label="First Name"
                      name="firstName"
                      placeholder="eg. Lucas"
                      containerProps={{
                        className: "!min-w-full mb-1",
                      }}
                      className={`text-primary-brown ${errors.firstName ? 'border-red-500' : ''}`}
                      labelProps={{
                        className: "!text-primary-white before:border-primary-white after:border-primary-white peer-focus:!text-primary-brown peer-focus:before:!border-primary-brown peer-focus:after:!border-primary-brown"
                      }}
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                    )}
                  </div>

                  <div>
                    {/* @ts-ignore */}
                    <Input
                      color="gray"
                      size="lg"
                      variant="static"
                      label="Last Name"
                      name="lastName"
                      placeholder="eg. Jones"
                      containerProps={{
                        className: "!min-w-full mb-1",
                      }}
                      className={`text-primary-brown ${errors.lastName ? 'border-red-500' : ''}`}
                      labelProps={{
                        className: "!text-primary-white before:border-primary-white after:border-primary-white peer-focus:!text-primary-brown peer-focus:before:!border-primary-brown peer-focus:after:!border-primary-brown"
                      }}
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                <div className="mb-8">
                  {/* @ts-ignore */}
                  <Input
                    color="gray"
                    size="lg"
                    variant="static"
                    label="Email"
                    name="email"
                    placeholder="eg. lucas@mail.com"
                    containerProps={{
                      className: "!min-w-full mb-1",
                    }}
                    className={`text-primary-brown ${errors.email ? 'border-red-500' : ''}`}
                    labelProps={{
                      className: "!text-primary-white before:border-primary-white after:border-primary-white peer-focus:!text-primary-brown peer-focus:before:!border-primary-brown peer-focus:after:!border-primary-brown"
                    }}
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                <p className="!text-primary-brown text-sm mb-2">
                  What are you interested in?
                </p>
                <div className="-ml-3 mb-14">
                  {/* @ts-ignore */}
                  <Radio
                    color="brown"
                    name="type"
                    value="Design"
                    label="Design"
                    defaultChecked
                    className="text-primary-brown"
                    labelProps={{
                      className: "!text-primary-white peer-checked:!text-primary-brown"
                    }}
                    onChange={handleChange}
                  />
                  {/* @ts-ignore */}
                  <Radio 
                    color="brown" 
                    name="type" 
                    value="Development"
                    label="Development"
                    className="text-primary-brown"
                    labelProps={{
                      className: "!text-primary-white peer-checked:!text-primary-brown"
                    }}
                    onChange={handleChange}
                  />
                  {/* @ts-ignore */}
                  <Radio 
                    color="brown" 
                    name="type" 
                    value="Support"
                    label="Support"
                    className="text-primary-brown"
                    labelProps={{
                      className: "!text-primary-white peer-checked:!text-primary-brown"
                    }}
                    onChange={handleChange}
                  />
                  {/* @ts-ignore */}
                  <Radio 
                    color="brown"  
                    name="type" 
                    value="Other"
                    label="Other"
                    className="text-primary-brown"
                    labelProps={{
                      className: "!text-primary-white peer-checked:!text-primary-brown"
                    }}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-8">
                  {/* @ts-ignore */}
                  <Textarea
                    className={`text-primary-brown ${errors.message ? 'border-red-500' : ''}`}
                    color="brown"
                    size="lg"
                    variant="static"
                    label="Your Message"
                    name="message"
                    containerProps={{
                      className: "!min-w-full mb-1",
                    }}
                    labelProps={{
                      className: "!text-primary-white before:border-primary-white after:border-primary-white peer-focus:!text-primary-brown peer-focus:before:!border-primary-brown peer-focus:after:!border-primary-brown"
                    }}
                    value={formData.message}
                    onChange={handleChange}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-1">{errors.message}</p>
                  )}
                </div>

                <div className="w-full flex flex-col items-end gap-4">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className={`w-full md:w-fit text-white px-6 py-2 rounded-sm transition-all duration-200 ${
                      isSubmitting 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-primary-brown hover:bg-primary-brown/90'
                    }`}
                  >
                    {isSubmitting ? 'Sending...' : 'Send message'}
                  </button>
                  
                  {submitStatus.message && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`w-full text-center p-3 rounded ${
                        submitStatus.type === 'success' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {submitStatus.message}
                    </motion.div>
                  )}
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
