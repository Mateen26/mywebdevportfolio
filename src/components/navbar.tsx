import React from "react";
import {
  RectangleStackIcon,
  UserCircleIcon,
  CommandLineIcon,
  Squares2X2Icon,
  XMarkIcon,
  Bars3Icon,
} from "@heroicons/react/24/solid";
import logo from "../../public/image/mateen-rajput-high-resolution-logo.svg"
import Image from "next/image";

const NAV_MENU = [
  {
    name: "Page",
    icon: RectangleStackIcon,
  },
  {
    name: "Account",
    icon: UserCircleIcon,
  },
  {
    name: "Docs",
    icon: CommandLineIcon,
    href: "https://www.material-tailwind.com/docs/react/installation",
  },
];

interface NavItemProps {
  children: React.ReactNode;
  href?: string;
}

function NavItem({ children, href }: NavItemProps) {
  return (
    <li>
      <a
        href={href}
        className="flex items-center gap-2 font-medium text-primary-white"
      >
        {children}
      </a>
    </li>
  );
}

export function Navbar() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen((cur) => !cur);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) setOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className=" border-0 sticky top-0 z-50 !bg-primary-black shadow py-4 px-6">
      <div className="absolute inset-0  filter blur-sm !bg-primary-black" /> {/* Added this line */}
      <div className="container mx-auto flex items-center justify-between  relative z-10  mt-2"> {/* Adjusted z-index */}
        <Image src={logo} alt="logo" width={200} height={200}/>
        {/* <h3 className="text-lg text-primary-white font-bold">
          Material Tailwind
        </h3> */}
        {/* <ul className="ml-10 hidden items-center gap-8 lg:flex">
          {NAV_MENU.map(({ name, icon: Icon, href }) => (
            <NavItem key={name} href={href}>
              <Icon className="h-5 w-5" />
              {name}
            </NavItem>
          ))}
        </ul> */}
        <div className="hidden items-center gap-2 lg:flex">
          <a href="https://www.material-tailwind.com/blocks" target="_blank" rel="noopener noreferrer">
            <button className="bg-gray-900 text-primary-white px-4 py-2 rounded">Let&lsquo;s Connect</button>
          </a>
        </div>
        <button
          onClick={handleOpen}
          className="ml-auto inline-block lg:hidden"
        >
          {open ? (
            <XMarkIcon strokeWidth={2} className="h-6 w-6" />
          ) : (
            <Bars3Icon strokeWidth={2} className="h-6 w-6" />
          )}
        </button>
      </div>
      {open && (
        <div className="container mx-auto mt-3 border-t border-gray-200 px-2 pt-4">
          <ul className="flex flex-col gap-4">
            {NAV_MENU.map(({ name, icon: Icon }) => (
              <NavItem key={name}>
                <Icon className="h-5 w-5" />
                {name}
              </NavItem>
            ))}
          </ul>
          <div className="mt-6 mb-4 flex items-center gap-2">
            <button className="text-primary-white">Sign In</button>
            <a href="https://www.material-tailwind.com/blocks" target="_blank" rel="noopener noreferrer">
              <button className="bg-gray-500 text-primary-white px-4 py-2 rounded">Blocks</button>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
