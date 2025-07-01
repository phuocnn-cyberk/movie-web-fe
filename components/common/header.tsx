"use client";

import React, { useState, useEffect } from "react";
import streamVibeLogo from "@/public/logos/stream-vibe-logo.svg";
import streamVibeLogoDark from "@/public/logos/stream-vibe-logo.svg";
import Image from "next/image";
import SunLogo from "@/public/logos/sun.svg";
import Link from "next/link";
import { Menu, Moon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export const Header: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    // Add preload class to prevent transitions on page load
    document.documentElement.classList.add("preload");

    const savedTheme = localStorage.getItem("theme");

    // Default to dark theme if no saved preference
    const shouldBeDark = savedTheme !== "light";
    setIsDarkMode(shouldBeDark);

    // Apply theme to document
    if (shouldBeDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Remove preload class after a brief delay to enable transitions
    setTimeout(() => {
      document.documentElement.classList.remove("preload");
    }, 100);
  }, []);

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);

    if (newTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <header className="flex bg-button-bg-light dark:bg-helix-black mx-auto justify-center items-center  flex-col text-sm text-helix-blue dark:text-gray-300 font-normal py-4 max-md:max-w-full">
      <div className="relative flex w-full max-w-[1200px] items-center justify-between flex-wrap max-md:max-w-full px-4">
        {/* Mobile hamburger menu */}
        <div className="flex flex-row items-center gap-2">
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger className="text-helix-blue dark:text-gray-300 hover:text-accent transition-colors duration-200 cursor-pointer flex items-center">
                <Menu className="w-5 h-5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mt-7 ml-2 bg-[#F8FEFF] dark:bg-helix-blue">
                <DropdownMenuItem>
                  <Link href="#products" className="w-full">
                    Products
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="#docs" className="w-full">
                    Docs
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="#faq" className="w-full">
                    FAQ
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    href="https://apply.workable.com/helixfinance/"
                    target="_blank"
                    className="w-full"
                  >
                    Career
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="#blogs" className="w-full">
                    Blogs
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Link href="/" aria-label="Go to homepage">
            <Image
              src={isDarkMode ? streamVibeLogoDark : streamVibeLogo}
              alt="StreamVibe Logo"
              className="w-full shrink-0 my-auto cursor-pointer"
            />
          </Link>
        </div>

        {/* Desktop navigation - hidden on mobile */}
        <nav
          className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 bg-white dark:bg-white/10 text-white shadow-[0px_0px_4px_rgba(0,0,0,0.1)] dark:shadow-[0px_0px_4px_rgba(255,255,255,0.1)] items-center gap-8 whitespace-nowrap px-6 py-2.5 rounded-full"
          aria-label="Main navigation"
        >
          <Link href="/" className="text-helix-blue dark:text-white self-stretch my-auto hover:text-accent transition-colors duration-200">
            Home
          </Link>
          <Link
            href="#products"
            className="text-helix-blue dark:text-white self-stretch my-auto hover:text-accent transition-colors duration-200"
            aria-label="Products section"
          >
            Products
          </Link>
          <Link
            href="#docs"
            className="text-helix-blue dark:text-white self-stretch my-auto hover:text-accent transition-colors duration-200"
            aria-label="Documentation"
          >
            Docs
          </Link>
          <Link
            href="#faq"
            className="text-helix-blue dark:text-white self-stretch my-auto hover:text-accent transition-colors duration-200"
            aria-label="Frequently asked questions"
          >
            FAQ
          </Link>
        </nav>

        <div className="flex items-center gap-2 md:gap-6">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="relative p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 ease-in-out hover:scale-110 active:scale-95"
            aria-label={
              isDarkMode ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            <div className="relative w-6 h-6">
              {/* Sun Icon */}
              <div
                className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                  isDarkMode
                    ? "opacity-0 rotate-180 scale-0"
                    : "opacity-100 rotate-0 scale-100"
                }`}
              >
                <Image src={SunLogo} alt="Sun Logo" className="w-6 h-6" />
              </div>

              {/* Moon Icon */}
              <div
                className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                  isDarkMode
                    ? "opacity-100 rotate-0 scale-100"
                    : "opacity-0 -rotate-180 scale-0"
                }`}
              >
                <Moon className="w-6 h-6 text-gray-300" />
              </div>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
