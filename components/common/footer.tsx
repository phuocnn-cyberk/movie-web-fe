import React from "react";
import Image from "next/image";
import streamVibesLogo from "@/public/logos/stream-vibe-logo.svg";
import background2 from "@/public/images/bg-footer-2.svg";
import Link from "next/link";

interface FooterItem {
  label: string;
  href?: string;
}

interface FooterLinkProps {
  children: React.ReactNode;
  href?: string;
  className?: string;
}

const FooterLink: React.FC<FooterLinkProps> = ({
  children,
  href,
  className = "",
}) => {
  const baseClasses =
    "text-white hover:text-helix-blue-light text-sm transition-colors duration-200 cursor-pointer";

  if (href) {
    const isLegalLink = legalLinks.some((link) => link.href === href);
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
        <FooterLink
          key={item.label}
          href={item.href}
          className={index > 0 ? "mt-[19px] block" : "block"}
        >
          {item.label}
        </FooterLink>
      ))}
    </div>
  );
};

const socialLinks = [
  { label: "X (Twitter)", href: "https://twitter.com/helix_finance" },
  { label: "Linkedin", href: "https://www.linkedin.com/company/helixfinance/" },
  { label: "Telegram", href: "https://t.me/helixfinance_announcements" },
  { label: "Discord", href: "https://discord.gg/hjsEaJ48aF" },
];

const resourceLinks = [
  { label: "Docs", href: "" },
  {
    label: "Brand Kit",
    href: "https://drive.google.com/drive/u/0/folders/1Ura3yN8AIwNtme4ZKCVA6cWiHP6LikcK",
  },
  {
    label: "Contact us",
    href: "https://yyy0ug0wcyj.typeform.com/to/j1cpvh8j/",
  },
];

const legalLinks = [
  { label: "Terms of Service", href: "/terms-of-service" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Legal Disclaimer", href: "/legal-disclaimer" },
];

export const Footer: React.FC = () => {
  return (
    <footer className="overflow-hidden bg-[#111111] relative border-t border-gray-600/60">
      <div className="absolute w-full h-[2px] bg-gray-600/60 bottom-30 md:bottom-22" />
      <Image
        src={background2}
        alt="Background"
        className="absolute right-0 scale-105 h-full"
      />
      <section className="w-full flex justify-center mx-auto pb-8 pt-8 md:pt-20 px-20 max-md:w-full max-md:px-5">
        <div className="z-10 w-[1230px] flex flex-col text-sm mx-auto ">
          <div className="flex md:flex-row flex-col gap-y-10 max-md:justify-center items-center md:gap-30 md:items-start w-full mx-auto ">
            <Image src={streamVibesLogo} alt="Stream Vibes Logo" />
            <nav
              className="flex  w-full max-w-[484px]  max-md:text-center text-white flex-wrap max-sm:mx-auto"
              aria-label="Footer navigation"
            >
              <FooterColumn items={socialLinks} />
              <FooterColumn items={resourceLinks} />
              <FooterColumn items={legalLinks} />
            </nav>
          </div>
          <div className="flex md:flex-row flex-col justify-between items-center max-md:mx-auto mt-34">
            <p className="text-gray-400">
              This page has ended, but the possibilities remain endless.
            </p>
            <p className="text-gray-400 mt-6  md:absolute md:right-24">
              © 2025 Stream Vibes
            </p>
          </div>
        </div>
      </section>
    </footer>
  );
};
