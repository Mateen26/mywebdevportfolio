import type { Config } from "tailwindcss";
const withMT = require("@material-tailwind/react/utils/withMT");

const config: Config = withMT({
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend:{
      colors:{
        "primary-black":"#0f0f0f",
        "primary-white":"#c6c8c9",
        "primary-brown":"#F39361"
      }
    }
  },
  plugins: [],
});

export default config;
