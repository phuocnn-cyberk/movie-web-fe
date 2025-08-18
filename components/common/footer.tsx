"use client";

import background2 from "@/public/images/bg-footer-2.svg";
import streamVibesLogo from "@/public/logos/stream-vibe-logo.svg";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface FooterItem {
  label: string;
  href?: string;
}

interface FooterLinkProps {
  children: React.ReactNode;
  href?: string;
  className?: string;
}

const FooterLink: React.FC<FooterLinkProps> = ({ children, href, className = "" }) => {
  const baseClasses = "text-white hover:text-helix-blue-light text-sm transition-colors duration-200 cursor-pointer";

  if (href) {
    const isLegalLink = legalLinks.some((link) => link.label === href);
    const isAnchorLink = href.startsWith("#");

    if (isAnchorLink) {
      const handleAnchorClick = (e: React.MouseEvent) => {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      };

      return (
        <button
          onClick={handleAnchorClick}
          className={`${baseClasses} ${className} border-none bg-transparent p-0 text-left`}
        >
          {children}
        </button>
      );
    }

    return (
      <Link
        href={href}
        className={`${baseClasses} ${className}`}
        target={isLegalLink ? undefined : "_blank"}
        rel={isLegalLink ? undefined : "noopener noreferrer"}
      >
        {children}
      </Link>
    );
  }

  return <div className={`${baseClasses} ${className}`}>{children}</div>;
};

interface FooterColumnProps {
  items: FooterItem[];
}

const FooterColumn: React.FC<FooterColumnProps> = ({ items }) => {
  return (
    <div className="flex-1 shrink basis-[0%]">
      {items.map((item, index) => (
        <FooterLink key={item.label} href={item.href} className={index > 0 ? "mt-[19px] block" : "block"}>
          {item.label}
        </FooterLink>
      ))}
    </div>
  );
};

const socialLinks = [
  { label: "Categories", href: "#categories" },
  { label: "Devices", href: "#devices" },
  { label: "Plans", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

const resourceLinks = [
  { label: "Docs", href: "" },
  {
    label: "Contact us",
    href: "/support",
  },
];

const legalLinks = [{ label: "Terms of Service" }, { label: "Privacy Policy" }, { label: "Legal Disclaimer" }];

export const Footer: React.FC = () => {
  return (
    <footer className="relative overflow-hidden border-t border-gray-600/60 bg-[#111111]">
      <div className="absolute bottom-30 h-[2px] w-full bg-gray-600/60 md:bottom-22" />
      <Image src={background2} alt="Background" className="absolute right-0 h-full scale-105" />
      <section className="mx-auto flex w-full justify-center px-20 pt-8 pb-8 max-md:w-full max-md:px-5 md:pt-20">
        <div className="z-10 mx-auto flex w-[1230px] flex-col text-sm">
          <div className="mx-auto flex w-full flex-col items-center gap-y-10 max-md:justify-center md:flex-row md:items-start md:gap-30">
            <Image src={streamVibesLogo} alt="Stream Vibes Logo" />
            <nav
              className="flex w-full max-w-[484px] flex-wrap text-white max-md:text-center max-sm:mx-auto"
              aria-label="Footer navigation"
            >
              <FooterColumn items={socialLinks} />
              <FooterColumn items={resourceLinks} />
              <FooterColumn items={legalLinks} />
            </nav>
          </div>
          <div className="mt-34 flex flex-col items-center justify-between max-md:mx-auto md:flex-row">
            <p className="text-gray-400">This page has ended, but the possibilities remain endless.</p>
            <p className="mt-6 text-gray-400 md:absolute md:right-24">© 2025 Stream Vibes</p>
          </div>
        </div>
      </section>
    </footer>
  );
};
