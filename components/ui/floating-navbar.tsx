"use client";

import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Link from "next/link";

export const FloatingHeader = () => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const direction = current - scrollYProgress.getPrevious()!;
      if (scrollYProgress.get() < 0.05) {
        setVisible(false);
      } else {
        setVisible(direction < 0);
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.header
        initial={{ opacity: 1, y: -100 }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
        className="fixed top-5 inset-x-0 z-[999] px-6 py-4 w-full"
      >
        <div className="max-w-[570px] mx-auto flex justify-center bg-black/80 rounded-2xl px-8 py-4 text-white shadow-lg backdrop-blur border border-white/30">
          <nav className="flex items-center gap-4">
            <Link
              href="#"
              className="px-4 py-2 rounded-xl bg-white text-black font-semibold transition hover:bg-gray-100"
            >
              Home
            </Link>
            <Link
              href="#movies"
              className="px-4 py-2 rounded-xl hover:text-red-500 transition"
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
        </div>
      </motion.header>
    </AnimatePresence>
  );
};
