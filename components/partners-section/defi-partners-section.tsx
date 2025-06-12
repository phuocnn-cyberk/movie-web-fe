import React from "react";
import Image from "next/image";
import { TextFade } from "@/components/ui/text-fade";

// Defi Partners
import arbitrum from "@/public/logos/partners/light/arbitrum.svg";
import chain from "@/public/logos/partners/light/chain.svg";
import clearpool from "@/public/logos/partners/light/clearpool.svg";
import cth from "@/public/logos/partners/light/cth.svg";
import hextrust from "@/public/logos/partners/light/hextrust.svg";
import plume from "@/public/logos/partners/light/plume.svg";
import wspn from "@/public/logos/partners/light/wspn.svg";

// Defi Partners Dark
import arbitrumDark from "@/public/logos/partners/dark/arbitrum.svg";
import chainDark from "@/public/logos/partners/dark/chain.svg";
import clearpoolDark from "@/public/logos/partners/dark/clearpool.svg";
import hextrustDark from "@/public/logos/partners/dark/hextrust.svg";
import plumeDark from "@/public/logos/partners/dark/plume.svg";
import wspnDark from "@/public/logos/partners/dark/wspn.svg";
import cthDark from "@/public/logos/partners/dark/cth.svg";

const defiPartnerLogos = [
  { src: wspn, srcDark: wspnDark, alt: "wspn" },
  { src: arbitrum, srcDark: arbitrumDark, alt: "arbitrum" },
  { src: plume, srcDark: plumeDark, alt: "plume" },
  { src: clearpool, srcDark: clearpoolDark, alt: "clearpool" },
  { src: chain, srcDark: chainDark, alt: "chain" },
  { src: hextrust, srcDark: hextrustDark, alt: "hextrust" },
  { src: cth, srcDark: cthDark, alt: "cth" },
];

export const DefiPartnersSection: React.FC = () => {
  return (
    <section className="items-center pb-10 w-full flex flex-col overflow-hidden px-20 max-md:px-5 dark:bg-helix-black">
      {/* Light theme */}
      <div className="dark:hidden flex w-full px-4 md:px-17 pt-12 pb-8 md:pb-16 max-w-[1350px] rounded-2xl flex-col items-stretch relative">
        <TextFade direction="up">
          <h1 className="text-helix-black text-5xl text-center max-md:text-2xl">
            Our Partners
          </h1>
        </TextFade>
      </div>

      <div className="flex dark:hidden flex-col justify-center items-center">
        {/* Desktop view */}
        <div className="hidden md:flex flex-wrap justify-center items-center gap-4">
          {defiPartnerLogos.map((logo, index) => (
            <Image key={index} src={logo.src} alt={logo.alt} />
          ))}
        </div>
        {/* Mobile view - 3 per row */}
        <div className="md:hidden flex flex-wrap justify-center items-center gap-4 px-4 w-full">
          {defiPartnerLogos.map((logo, index) => (
            <div
              key={index}
              className="w-[calc(33.333%-16px)] flex justify-center"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                className="w-full h-auto object-contain max-h-20"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Dark theme */}
      <div className="hidden dark:flex w-full px-4 md:px-17 pt-12 pb-8 md:pb-16 max-w-[1350px] rounded-2xl flex-col items-stretch relative">
        <TextFade direction="up">
          <h1 className="text-white text-5xl text-center max-md:text-2xl">
            Our Partners
          </h1>
        </TextFade>
      </div>

      <div className="hidden dark:flex flex-col justify-center items-center">
        {/* Desktop view */}
        <div className="hidden md:flex flex-wrap justify-center items-center gap-4">
          {defiPartnerLogos.map((logo, index) => (
            <Image key={index} src={logo.srcDark} alt={logo.alt} />
          ))}
        </div>
        {/* Mobile view - 3 per row */}
        <div className="md:hidden flex flex-wrap justify-center items-center gap-4 px-4 w-full">
          {defiPartnerLogos.map((logo, index) => (
            <div
              key={index}
              className="w-[calc(33.333%-16px)] flex justify-center"
            >
              <Image
                src={logo.srcDark}
                alt={logo.alt}
                className="w-full h-auto object-contain max-h-20"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
