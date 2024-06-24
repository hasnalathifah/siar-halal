import React from "react";
import {
  Navbar as MTNavbar,
  Collapse,
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

const NAV_MENU = ["Home", "About Us", "Contact Us"];

function NavItem({ children }: { children: React.ReactNode }) {
  return (
    <li>
      <Typography
        as="a"
        href="#"
        variant="paragraph"
        className="flex items-center gap-2 font-medium"
        placeholder={""} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}      >
        {children}
      </Typography>
    </li>
  );
}

export function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [isScrolling, setIsScrolling] = React.useState(false);
  function handleOpen() {
    setOpen((cur) => !cur);
  }

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpen(false)
    );
  }, []);

  React.useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 0) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <MTNavbar
      fullWidth
      shadow={false}
      blurred={false}
      color={isScrolling ? "white" : "transparent"}
      className="fixed top-0 z-50 border-0"
      placeholder={""}  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}    >
      <div className="container mx-auto flex items-center justify-between">
        <Typography
          as="a"
          href="siar-halal-git-ar-hasnalathifahs-projects.vercel.app"
          target="_blank"
          className="text-lg font-bold text-light-blue-700"
          placeholder={""} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}        >
          <Image className=" w-auto h-auto" src="/image/logo_navbar.png" alt="" width={100} height={20}/>
        </Typography>
        <ul
          className="ml-10 hidden items-center gap-6 lg:flex text-blue-gray-700"
        >
          {NAV_MENU.map((name) => (
            <NavItem key={name}>{name}</NavItem>
          ))}
        </ul>
        <div className="hidden items-center gap-2 lg:flex">
          <Link href="/login">
            <Button placeholder={""} variant="text" color="light-blue" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              Log in
            </Button>
          </Link>
          <Link href="/signup" target="_blank">
            <Button placeholder={""} className=" bg-light-blue-800" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Register</Button>
          </Link>
        </div>
        <IconButton
          variant="text"
          onClick={handleOpen}
          color="blue-gray"
          className="ml-auto inline-block lg:hidden"
          placeholder={""}
          onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
        >
          {open ? (
            <XMarkIcon strokeWidth={2} className="h-6 w-6" />
          ) : (
            <Bars3Icon strokeWidth={2} className="h-6 w-6" />
          )}
        </IconButton>
      </div>
      <Collapse open={open}>
        <div className="container mx-auto bg-white rounded-lg py-4 px-6 mt-3 border-t border-gray-200">
          <ul className="flex flex-col gap-4 text-blue-gray-700
          ">
            {NAV_MENU.map((name) => (
              <NavItem key={name}>{name}</NavItem>
            ))}
          </ul>
          <div className="mt-6 flex items-center gap-2">
            <Link href="/login">
              <Button placeholder={""} variant="text" color="light-blue" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Log in</Button>
            </Link>
            <Link href="/signup" target="_blank">
              <Button placeholder={""} className=" bg-light-blue-800" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Register</Button>
            </Link>
          </div>
        </div>
      </Collapse>
    </MTNavbar>
  );
}

export default Navbar;