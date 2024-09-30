// @ts-nocheck
"use client";

import React, { useEffect, useState } from "react"; 
import Image from "next/image";
import { Input } from "@material-tailwind/react";
import { fetchDataFromSanity, sanityClient } from "./sanityClient"; 
import imageUrlBuilder from '@sanity/image-url'; 
import { motion } from "framer-motion"; 
import { HeroSectionSkeleton } from "../components/Skeletons";
import 'react-typist/dist/Typist.css';
import Typist from 'react-typist';

const builder = imageUrlBuilder(sanityClient); 

function urlFor(source :any) {
  return builder.image(source); 
}

function Hero() {
	const [data, setData] = useState(null);
	const [showBio, setShowBio] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			const query = '*[_type == "author"]';
			const result = await fetchDataFromSanity(query);
			setData(result[0]); 
		};

		fetchData();
	}, []);

	if (!data) return <HeroSectionSkeleton/>; 

	return (
		<motion.header 
			className="bg-primary-black p-8 lg:mt-20"
			initial={{ opacity: 0 }} 
			animate={{ opacity: 1 }} 
			transition={{ duration: 1 }}
		>
			<div className="container mx-auto grid h-full gap-10 min-h-[60vh] w-full grid-cols-1 items-center lg:grid-cols-2">
				<div className="row-start-2 lg:row-auto relative overflow-hidden">
					<motion.div 
						className="mb-4 lg:text-5xl !leading-tight text-3xl font-bold text-primary-brown"
						initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
						animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
						transition={{ duration: 1, delay: 0.2 }}
					>
						<Typist onTypingDone={() => setShowBio(true)}>
							Welcome to my Web Development
							<Typist.Backspace count={0} delay={200} />
							<span> Website</span>
							<Typist.Backspace count={7} delay={400} />
							<span> WebApp</span>
							<Typist.Backspace count={6} delay={800} />
							<span> Portfolio</span>
						</Typist>
					</motion.div>
					{showBio && (
						<motion.div 
							className="mb-4 !text-primary-white md:pr-16 xl:pr-28"
							initial={{ opacity: 0, y: -50 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 1 }}
						>
							<Typist avgTypingDelay={2} >
								{/* @ts-ignore */}
								{data.bio[0].children[0].text}
							</Typist>
						</motion.div>
					)}
					<motion.div 
						className="grid"
						initial={{ opacity: 0, filter: "blur(10px)" }}
						animate={{ opacity: 1, filter: "blur(0px)" }}
						transition={{ duration: 1, delay: 0.5 }}
					>
						<span className="mb-2 text-primary-brown font-medium">
							Your email
						</span>
						<div className="mb-2 flex w-full flex-col gap-4 md:w-10/12 md:flex-row">
							{/* @ts-ignore */}
							<Input color="gray" label="Enter your email" size="lg" />
							<button color="gray" className="w-full px-4 md:w-[12rem]">
								require offer
							</button>
						</div>
					</motion.div>
					<motion.p 
						className="font-normal !text-primary-white"
						initial={{ opacity: 0, filter: "blur(10px)" }}
						animate={{ opacity: 1, filter: "blur(0px)" }}
						transition={{ duration: 1, delay: 0.5 }}
					>
						Read my{" "}
						<a href="#" className="font-medium underline transition-colors text-primary-brown">
							Terms and Conditions
							</a>
					</motion.p>
				</div>
				<motion.div
					initial={{ scale: 0.8, filter: "blur(10px)" }}
					animate={{ scale: 1, filter: "blur(0px)" }}
					transition={{ duration: 1 }}
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
