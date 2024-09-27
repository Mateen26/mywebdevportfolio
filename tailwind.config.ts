import type { Config } from "tailwindcss";
const withMT = require("@material-tailwind/react/utils/withMT");
const defaultTheme = require('tailwindcss/defaultTheme')

const config: Config = withMT({
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'xs': { 'max': '640px' },
      'xs-mini': { 'max': '429px' },
      'only-sm': { min: '641px', max: '767px' },
      'only-md': { min: '768px', max: '1023px' },
      'only-lg': { min: '1024px', max: '1279px' },
      'only-xl': { min: '1280px', max: '1535px' },
      ...defaultTheme.screens,
    },
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
