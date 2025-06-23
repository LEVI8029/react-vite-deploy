// src/Components/Header.jsx
import { useLocation } from "react-router-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { brainwave } from "../assets";
import { navigation } from "../constants/index.js";
import Button from "./Button";
import MenuSvg from "../assets/svg/MenuSvg";
import { HamburgerMenu } from "./design/Header";
import { useState } from "react";
import { Link } from "react-router-dom";
import { UserButton, SignedIn, SignedOut, useAuth } from "@clerk/clerk-react";

const Header = () => {
  const pathname = useLocation();
  const [openNavigation, setOpenNavigation] = useState(false);
  const { isLoaded } = useAuth(); // ensures Clerk auth is initialized

  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false);
      enablePageScroll();
    } else {
      setOpenNavigation(true);
      disablePageScroll();
    }
  };

  const handleClick = () => {
    if (!openNavigation) return;
    enablePageScroll();
    setOpenNavigation(false);
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm ${
        openNavigation ? "bg-n-8" : "bg-n-8/90 backdrop-blur-sm"
      }`}
    >
      <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
        <a className="block w-[12rem] xl:mr-8" href="#hero">
          <img src={brainwave} width={190} height={40} alt="Brainwave" />
        </a>

        <nav
          className={`${
            openNavigation ? "flex" : "hidden"
          } fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}
        >
          <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
            {navigation.map((item) => (
              <a
                key={item.id}
                href={item.url}
                onClick={handleClick}
                className={`block relative font-code text-xl uppercase text-n-1 transition-colors hover:text-color-1 ${
                  item.onlyMobile ? "lg:hidden" : ""
                } px-4 py-4 md:py-6 lg:-mr-0.25 lg:text-xs lg:font-semibold ${
                  item.url === pathname.hash
                    ? "z-2 lg:text-n-1"
                    : "lg:text-n-1/50"
                } lg:leading-5 xl:px-12`}
              >
                {item.title}
              </a>
            ))}

            {/* Mobile - Signed In User Button */}
            <SignedIn>
              <div className="lg:hidden mt-6">
                <UserButton afterSignOutUrl="/" />
              </div>
            </SignedIn>

            {/* Mobile - Sign in/up only when signed out */}
            {isLoaded && (
              <SignedOut>
                <div className="lg:hidden flex flex-col items-center mt-6">
                  <Link
                    to="/sign-up"
                    className="button text-n-1/50 transition-colors hover:text-n-1"
                  >
                    New account
                  </Link>
                  <Link to="/sign-in" className="mt-2">
                    <Button>Sign in</Button>
                  </Link>
                </div>
              </SignedOut>
            )}
          </div>

          <HamburgerMenu />
        </nav>

        {/* Desktop - Signed In */}
        <SignedIn>
          <div className="hidden lg:flex items-center mr-4">
            <UserButton afterSignOutUrl="/" />
          </div>
        </SignedIn>

        {/* Desktop - Sign in/up when signed out */}
        <SignedOut>
          <Link
            to="/sign-up"
            className="button hidden mr-8 text-n-1/50 transition-colors hover:text-n-1 lg:block"
          >
            New account
          </Link>

          <Link to="/sign-in" className="hidden lg:flex">
            <Button>Sign in</Button>
          </Link>
        </SignedOut>

        {/* Hamburger Menu Button */}
        <Button
          className="ml-auto lg:hidden"
          px="px-3"
          onClick={toggleNavigation}
        >
          <MenuSvg openNavigation={openNavigation} />
        </Button>
      </div>
    </div>
  );
};

export default Header;
