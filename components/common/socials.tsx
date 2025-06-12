"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import DiscordIcon from "@/public/logos/socials/Discord.svg";
import TelegramIcon from "@/public/logos/socials/Telegram.svg";
import TwitterIcon from "@/public/logos/socials/Twitter.svg";
import LinkedInIcon from "@/public/logos/socials/Linkedin.svg";
import HelixLogo from "@/public/logos/helix-only.svg";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface SocialsDialogProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function SocialsDialog({
  children,
  open,
  onOpenChange,
}: SocialsDialogProps) {
  const socialLinks = [
    {
      name: "Twitter",
      icon: TwitterIcon,
      url: "https://twitter.com/helix_finance",
    },
    {
      name: "Telegram",
      icon: TelegramIcon,
      url: "https://t.me/helixfinance_announcements",
    },
    {
      name: "Discord",
      icon: DiscordIcon,
      url: "https://discord.gg/hjsEaJ48aF",
    },
    {
      name: "LinkedIn",
      icon: LinkedInIcon,
      url: "https://www.linkedin.com/company/helixfinance/",
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="gap-0 flex flex-col w-[480px] p-0  h-[320px]  bg-[#F8FEFF] dark:bg-helix-black text-black dark:text-white"
      >
        <div className="absolute w-full h-[235px] top-0 left-0 z-0 rounded-md bg-[radial-gradient(192.94%_185.53%_at_50%_-98.3%,#01A8AB_0%,rgba(1,168,171,0.717235)_33.44%,rgba(0,138,141,0.2)_73.42%,rgba(0,69,70,0)_100%)]"></div>
        <DialogHeader className="text-center gap-0 z-5">
          {/* Chain link icon and "Stay Connected" */}
          <div className="flex items-center justify-center mt-15">
            <div className="bg-button-bg-light backdrop-blur-sm rounded-2xl p-2">
              <Image src={HelixLogo} alt="Helix Logo" className="w-10 h-10" />
            </div>
          </div>

          {/* Main title */}
          <DialogTitle className="text-[20px] md:text-[28px]  mt-4  mx-auto font-[500] text-helix-black dark:text-white z-">
            Join Our Community!
          </DialogTitle>
        </DialogHeader>

        {/* Social media icons */}
        <div className="flex z-10 justify-center items-center space-x-1 md:space-x-[14px] mt-4">
          {socialLinks.map((social) => {
            return (
              <div className="flex flex-col items-center" key={social.name}>
                <Link
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl transition-all duration-300 transform hover:scale-110 hover:shadow-lg flex flex-col items-center justify-center w-12 h-12"
                  aria-label={`Follow us on ${social.name}`}
                >
                  <Image
                    src={social.icon}
                    alt={`${social.name} icon`}
                    className="w-full h-full"
                  />
                </Link>
                <span
                  key={`${social.name}-label`}
                  className="w-16 mt-2 text-center  text-sm text-helix-black dark:text-[#D0D0D0]"
                >
                  {social.name}
                </span>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
