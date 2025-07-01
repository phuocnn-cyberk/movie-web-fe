"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const FloatingNav = ({ className }: { className?: string }) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      const direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        setVisible(false);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "flex max-w-fit fixed top-5 inset-x-0 mx-auto bg-white dark:bg-[#30455b] text-white shadow-[0px_0px_4px_rgba(0,0,0,0.1)] dark:shadow-[0px_0px_4px_rgba(255,255,255,0.1)] items-center gap-8 whitespace-nowrap px-6 py-2.5 rounded-full z-[5000]",
          className
        )}
      >
        <Link
          href="/"
          className="text-sm text-helix-blue dark:text-white hover:text-accent transition-colors duration-200"
          aria-label="Home section"
        >
          Home
        </Link>
        <Link
          href="#products"
          className="text-sm text-helix-blue dark:text-white hover:text-accent transition-colors duration-200"
          aria-label="Products section"
        >
          Products
        </Link>

        <Link
          href="#docs"
          className="text-sm text-helix-blue dark:text-white hover:text-accent transition-colors duration-200"
          aria-label="Documentation"
        >
          Docs
        </Link>

        <Link
          href="#faq"
          className="text-sm text-helix-blue dark:text-white hover:text-accent transition-colors duration-200"
          aria-label="Frequently asked questions"
        >
          FAQ
        </Link>
      </motion.div>
    </AnimatePresence>
  );
};
