// @ts-nocheck
"use client";

import React, { useEffect, useState } from "react"; 
import Image from "next/image";
import { Input } from "@material-tailwind/react";
import { fetchDataFromSanity, sanityClient } from "./sanityClient"; 
import imageUrlBuilder from '@sanity/image-url'; 
import { motion } from "framer-motion"; 
import 'react-typist/dist/Typist.css';
import Typist from 'react-typist';
import { HeroSectionSkeleton, WindAnimation } from '../components/Skeletons';
import Link from 'next/link';

const builder = imageUrlBuilder(sanityClient); 

function urlFor(source :any) {
  return builder.image(source); 
}

function Hero() {
	const [data, setData] = useState(null);
	const [showBio, setShowBio] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			const query = '*[_type == "author"]';
			const result = await fetchDataFromSanity(query);
			setData(result[0]); 
			
			// Reduce the loading time to 1 second
			// setTimeout(() => {
				setLoading(false);
			// }, 1000);
		};

		fetchData();
	}, []);

	if (loading) {
		return <HeroSectionSkeleton />;
	}

	return (
		<motion.header 
			className="bg-primary-black py-8 px-12 lg:mt-20"
			initial={{ opacity: 0 }} 
			animate={{ opacity: 1 }} 
			transition={{ duration: 0.5 }}
		>
			<div className="container mx-auto grid h-full gap-10 min-h-[60vh] w-full grid-cols-1 items-center lg:grid-cols-2">
				<div className="order-1 lg:order-1">
					<motion.div 
						className="mb-4 lg:text-5xl !leading-tight text-3xl font-bold text-primary-brown "
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						
						transition={{ duration: 0.5, delay: 0.2 }}
					>
						<Typist onTypingDone={() => setShowBio(true)} avgTypingDelay={40} stdTypingDelay={20}>
							Welcome to my Web Development
							<Typist.Backspace count={0} delay={100} />
							<span> Website</span>
							<Typist.Backspace count={7} delay={200} />
							<span> WebApp</span>
							<Typist.Backspace count={6} delay={400} />
							<span> Portfolio</span>
						</Typist>
					</motion.div>
					{showBio && (
						<motion.div 
							className="mb-4 !text-primary-white md:pr-16 xl:pr-28"
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
						>
							<Typist avgTypingDelay={20} stdTypingDelay={10}>
								{/* @ts-ignore */}
								I&lsquo;m <span className="text-primary-brown">Mateen Rajput</span>, {data?.bio[0]?.children[0]?.text}
							</Typist>
						</motion.div>
					)}
					<motion.div 
						className="grid gap-6 md:pr-16 xl:pr-28"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5 }}
					>
						<p className="text-primary-white text-lg">
							Ready to bring your digital vision to life? Let&apos;s create something 
							<span className="text-primary-brown font-medium"> extraordinary </span> 
							together.
						</p>
						<div className="flex flex-col sm:flex-row gap-4">
							<button 
								onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
								className="bg-primary-brown text-white px-6 py-3 rounded-lg hover:bg-primary-brown/90 transition-all transform hover:scale-105 font-medium"
							>
								Let&apos;s Build Together →
							</button>
							<button 
								onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
								className="border border-primary-brown text-primary-brown px-6 py-3 rounded-lg hover:bg-primary-brown/10 transition-all text-center font-medium"
							>
								View My Work →
							</button>
						</div>
					</motion.div>
					<motion.p 
						className="font-normal !text-primary-white mt-6"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5 }}
					>
						Read my{" "}
						<Link 
							href="/terms" 
							className="font-medium underline transition-colors text-primary-brown hover:text-primary-brown/80"
						>
							Terms and Conditions
						</Link>
					</motion.p>
				</div>
				<motion.div
					initial={{ scale: 0.8 }}
					animate={{ scale: 1 }}
					transition={{ duration: 0.5 }} 
					className="order-2 lg:order-2"
				>
					<Image
						width={1024}
						height={1024}
						alt="team work"
						src={urlFor(data?.image?.asset).url()} 
						className="h-[36rem] w-full rounded-xl object-cover"
					/>
				</motion.div>
			</div>
		</motion.header>
	);
}

export default Hero;
