"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Search, Bell } from "lucide-react";
import helixLogoDark from "@/public/logos/helix-logo-white.svg";
import { usePathname } from "next/navigation";

export const Header = () => {
  const pathname = usePathname();
  return (
    <header className="absolute top-0 left-0 z-[999] text-white px-6 py-4 w-full">
      <div className="max-w-[1280px] mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <Image
            src={helixLogoDark}
            alt="StreamVibe Logo"
            className="w-[120px] cursor-pointer hover:opacity-90"
          />
        </Link>
        {/* Navigation */}
        <nav className="hidden md:flex items-center justify-center bg-black/80 rounded-2xl px-10 py-4 gap-4 text-white backdrop-blur border border-white/30 shadow-lg">
          {/* Nút Home được chọn */}
           <Link
            href="/"
            className={`px-4 py-2 rounded-xl font-semibold transition hover:bg-gray-100 ${
              pathname === "/" ? "bg-white text-black" : "hover:text-red-500"
            }`}
          >
            Home
          </Link>

          {/* Các mục khác */}
           <Link
            href="/movies"
            className={`px-4 py-2 rounded-xl transition ${
              pathname.startsWith("/movies")
                ? "bg-white text-black font-semibold"
                : "hover:text-red-500"
            }`}
          >
            Movies & Shows
          </Link>
          <Link
            href="#support"
            className="px-4 py-2 rounded-xl hover:text-red-500 transition"
          >
            Support
          </Link>
          <Link
            href="#subscriptions"
            className="px-4 py-2 rounded-xl hover:text-red-500 transition"
          >
            Subscriptions
          </Link>
        </nav>

        {/* Icon search + bell */}
        <div className="flex items-center gap-4">
          <button className="rounded-full w-9 h-9 bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition">
            <Search size={20} className="text-white" />
          </button>
          <button className="rounded-full w-9 h-9 bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition">
            <Bell size={20} className="text-white" />
          </button>
        </div>
      </div>
    </header>
  );
};