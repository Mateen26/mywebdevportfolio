"use client"
import { createClient } from "next-sanity";

const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, // updated to use NEXT_PUBLIC_ prefix
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET, // updated to use NEXT_PUBLIC_ prefix
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION, // updated to use NEXT_PUBLIC_ prefix
  useCdn: false, 
};
console.log(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, "project id ") // updated to use NEXT_PUBLIC_ prefix
export const sanityClient = createClient(config);

export const fetchDataFromSanity = async (query: string) => {
    const data = await sanityClient.fetch(query);
    return data;
};