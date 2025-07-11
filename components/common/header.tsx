"use client";

import React, { useState } from "react";
import { Search, Bell, Home, Play, HeadphonesIcon, CreditCard, Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import streamVibeLogo from "@/public/logos/stream-vibe-logo.svg";

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <Home className="h-4 w-4" />,
    },
    {
      name: "Movies & Shows",
      link: "/movies-shows",
      icon: <Play className="h-4 w-4" />,
    },
    {
      name: "Support",
      link: "/support",
      icon: <HeadphonesIcon className="h-4 w-4" />,
    },
    {
      name: "Subscriptions",
      link: "/subscriptions",
      icon: <CreditCard className="h-4 w-4" />,
    },
  ];

  const isActiveRoute = (route: string) => {
    if (route === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(route);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="hidden xl:flex items-center justify-between px-8 2xl:px-[162px] py-[30px] max-w-screen-2xl mx-auto">
        <Link href="/" aria-label="Go to homepage" className="flex items-center w-[199px] h-[60px] shrink-0">
          <Image src={streamVibeLogo} alt="StreamVibe Logo" className="w-full shrink-0 my-auto cursor-pointer" />
        </Link>

        <div className="flex items-center bg-[#0F0F0F] border-4 border-[#1F1F1F] rounded-xl pl-[10px] pr-[40px] py-[10px] gap-[30px]">
          {navItems.map((item, index) => (
            <div key={index} className="relative">
              {isActiveRoute(item.link) ? (
                <div className="bg-[#1A1A1A] border border-[#1A1A1A] rounded-lg px-6 py-[14px] whitespace-nowrap">
                  <span className="text-white text-[18px] font-medium font-manrope">
                    {item.name}
                  </span>
                </div>
              ) : (
                <Link href={item.link} className="block px-6 py-[14px]">
                  <span className="text-[#BFBFBF] text-[18px] font-normal font-manrope hover:text-white transition-colors whitespace-nowrap">
                    {item.name}
                  </span>
                </Link>
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-[30px] shrink-0">
          <button className="w-[34px] h-[34px] flex items-center justify-center" aria-label="Search">
            <Search className="w-[25.5px] h-[25.5px] text-white stroke-2" />
          </button>
          
          <button className="w-[34px] h-[34px] flex items-center justify-center" aria-label="Notifications">
            <Bell className="w-[23.55px] h-[25.5px] text-white stroke-2" />
          </button>
        </div>
      </nav>

      <nav className="hidden lg:flex xl:hidden relative items-center justify-between px-8 py-6 max-w-6xl mx-auto">
        <Link href="/" aria-label="Go to homepage" className="flex items-center">
          <Image src={streamVibeLogo} alt="StreamVibe Logo" className="h-12 w-auto cursor-pointer" />
        </Link>

        <div className="flex items-center bg-[#0F0F0F] border-2 border-[#1F1F1F] rounded-xl px-4 py-2 gap-4">
          {navItems.map((item, index) => (
            <div key={index} className="relative">
              {isActiveRoute(item.link) ? (
                <div className="bg-[#1A1A1A] border border-[#1A1A1A] rounded-lg px-4 py-2">
                  <span className="text-white text-sm font-medium font-manrope whitespace-nowrap">
                    {item.name}
                  </span>
                </div>
              ) : (
                <Link href={item.link} className="block px-4 py-2">
                  <span className="text-[#BFBFBF] text-sm font-normal font-manrope hover:text-white transition-colors whitespace-nowrap">
                    {item.name}
                  </span>
                </Link>
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button className="w-8 h-8 flex items-center justify-center" aria-label="Search">
            <Search className="w-5 h-5 text-white stroke-2" />
          </button>
          
          <button className="w-8 h-8 flex items-center justify-center" aria-label="Notifications">
            <Bell className="w-5 h-5 text-white stroke-2" />
          </button>
        </div>
      </nav>

      <nav className="flex lg:hidden items-center justify-between px-4 py-4">
        <Link href="/" aria-label="Go to homepage" className="flex items-center">
          <Image src={streamVibeLogo} alt="StreamVibe Logo" className="h-10 w-auto cursor-pointer" />
        </Link>

        <button
          onClick={toggleMobileMenu}
          className="w-10 h-10 flex items-center justify-center"
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <Menu className="w-6 h-6 text-white" />
          )}
        </button>
      </nav>

      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-[#141414] border-t border-[#1F1F1F] shadow-lg">
          <div className="px-4 py-6 space-y-4">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.link}
                className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors hover:bg-[#1F1F1F]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className={`${isActiveRoute(item.link) ? 'text-white' : 'text-[#BFBFBF]'}`}>
                  {item.icon}
                </div>
                <span className={`text-lg font-medium font-manrope ${
                  isActiveRoute(item.link) ? 'text-white' : 'text-[#BFBFBF]'
                }`}>
                  {item.name}
                </span>
              </Link>
            ))}

            <div className="flex items-center gap-4 px-4 pt-4 border-t border-[#1F1F1F]">
              <button className="flex items-center gap-2 px-4 py-2 bg-[#1F1F1F] rounded-lg" aria-label="Search">
                <Search className="w-5 h-5 text-white" />
                <span className="text-white font-medium">Search</span>
              </button>
              
              <button className="flex items-center gap-2 px-4 py-2 bg-[#1F1F1F] rounded-lg" aria-label="Notifications">
                <Bell className="w-5 h-5 text-white" />
                <span className="text-white font-medium">Notifications</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
