import { Typography, Button } from "@material-tailwind/react";
import logo from "../../public/image/mateen-rajput-high-resolution-logo.svg"
import Image from "next/image";

const LINKS = ["Home", "About Us", "Blog", "Service"];
const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="mt-10 px-8 pt-20">
      <div className="container mx-auto">
        <div className="mt-16 flex flex-wrap items-center justify-center gap-y-4 border-t border-gray-200 py-6 md:justify-between">
          <Image src={logo} alt="logo" width={200} height={200} />
         
          <ul className="flex gap-8 items-center">
            {LINKS.map((link) => (
              <li key={link}>
                <a
                  href="#"
                  className="font-normal text-gray-700 hover:text-gray-900 transition-colors"
                >
                  {link}
                </a>
              </li>
            ))}
            <button className="bg-gray-500 text-white px-4 py-2 rounded">subscribe</button>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
