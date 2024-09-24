// @ts-nocheck
"use client";

import React, { useEffect, useState } from "react"; // Import useState
import Image from "next/image";
import { Input } from "@material-tailwind/react";
import { fetchDataFromSanity, sanityClient } from "./sanityClient"; // Ensure sanityClient is imported
import imageUrlBuilder from '@sanity/image-url'; // Import the image URL builder
import { motion } from "framer-motion"; // Add this import

const builder = imageUrlBuilder(sanityClient); // Initialize the image builder

function urlFor(source :any) {
  return builder.image(source); // Function to generate image URL
}

function Hero() {
	const [data, setData] = useState(null); // State to hold fetched data

	useEffect(() => {
		const fetchData = async () => {
			const query = '*[_type == "author"]'; // Adjust query as needed
			const result = await fetchDataFromSanity(query);
			setData(result[0]); // Assuming you want the first author
		};

		fetchData();
	}, []);

	if (!data) return <div>Loading...</div>; // Loading state

	return (
		<motion.header 
			className="bg-primary-black p-8"
			initial={{ opacity: 0 }} 
			animate={{ opacity: 1 }} 
			transition={{ duration: 1 }} // Animation on appear
		>
			<div className="container mx-auto grid h-full gap-10 min-h-[60vh] w-full grid-cols-1 items-center lg:grid-cols-2">
				<div className="row-start-2 lg:row-auto">
					<h1 className="mb-4 lg:text-5xl !leading-tight text-3xl font-bold text-primary-white">
              {/* @ts-ignore */}
						{data.name} {/* Dynamic heading */}
					</h1>
					<p className="mb-4 !text-primary-white md:pr-16 xl:pr-28">
              {/* @ts-ignore */}
						{data.bio[0].children[0].text} {/* Dynamic description */}
					</p>
					<div className="grid">
						<span className="mb-2 text-primary-white font-medium">
							Your email
						</span>
						<div className="mb-2 flex w-full flex-col gap-4 md:w-10/12 md:flex-row">
              {/* @ts-ignore */}
							<Input color="gray" label="Enter your email" size="lg" />
							<button color="gray" className="w-full px-4 md:w-[12rem]">
								require offer
							</button>
						</div>
					</div>
					<p className="font-normal !text-primary-white">
						Read my{" "}
						<a href="#" className="font-medium underline transition-colors text-primary-white">
							Terms and Conditions
						</a>
					</p>
				</div>
				<Image
					width={1024}
					height={1024}
					alt="team work"
					src={urlFor(data?.image?.asset).url()} // Use the image builder to get the URL
					className="h-[36rem] w-full rounded-xl object-cover"
				/>
			</div>
		</motion.header>
	);
}

export default Hero;
