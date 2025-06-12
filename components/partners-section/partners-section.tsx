import Image from "next/image";
import { TextFade } from "@/components/ui/text-fade";

// VCs
import aptos from "@/public/logos/vcs/light/aptos.svg";
import comma3 from "@/public/logos/vcs/light/comma3.svg";
import gallet from "@/public/logos/vcs/light/gallet.svg";
import neoclassic from "@/public/logos/vcs/light/neoclassic.svg";
import newtribe from "@/public/logos/vcs/light/newtribe.svg";
import saison from "@/public/logos/vcs/light/saison.svg";
import shield from "@/public/logos/vcs/light/shield.svg";
import superscrypt from "@/public/logos/vcs/light/superscrypt.svg";
import synthetix from "@/public/logos/vcs/light/synthetix.svg";
import taisu from "@/public/logos/vcs/light/taisu.svg";
import ytwo from "@/public/logos/vcs/light/ytwo.svg";

// VCs Dark
import aptosDark from "@/public/logos/vcs/dark/aptos.svg";
import comma3Dark from "@/public/logos/vcs/dark/comma3.svg";
import galletDark from "@/public/logos/vcs/dark/gallet.svg";
import neoclassicDark from "@/public/logos/vcs/dark/neoclassic.svg";
import newtribeDark from "@/public/logos/vcs/dark/newtribe.svg";
import saisonDark from "@/public/logos/vcs/dark/saison.svg";
import shieldDark from "@/public/logos/vcs/dark/shield.svg";
import superscryptDark from "@/public/logos/vcs/dark/superscrypt.svg";
import synthetixDark from "@/public/logos/vcs/dark/synthetix.svg";
import taisuDark from "@/public/logos/vcs/dark/taisu.svg";
import ytwoDark from "@/public/logos/vcs/dark/ytwo.svg";

// Angels
import algorand from "@/public/logos/angels/light/algorand.svg";
import blocktower from "@/public/logos/angels/light/blocktower.svg";
import fireblocks from "@/public/logos/angels/light/fireblocks.svg";
import milken from "@/public/logos/angels/light/milken.svg";
import phd from "@/public/logos/angels/light/phd.svg";
import wave from "@/public/logos/angels/light/wave.svg";
import xtream from "@/public/logos/angels/light/xtream.svg";

// Angels Dark
import algorandDark from "@/public/logos/angels/dark/algorand.svg";
import blocktowerDark from "@/public/logos/angels/dark/blocktower.svg";
import fireblocksDark from "@/public/logos/angels/dark/fireblocks.svg";
import milkenDark from "@/public/logos/angels/dark/milken.svg";
import phdDark from "@/public/logos/angels/dark/phd.svg";
import waveDark from "@/public/logos/angels/dark/wave.svg";
import xtreamDark from "@/public/logos/angels/dark/xtream.svg";

const firstRowLogos = [
  { src: aptos, srcDark: aptosDark, alt: "aptos" },
  { src: comma3, srcDark: comma3Dark, alt: "comma3" },
  { src: newtribe, srcDark: newtribeDark, alt: "newtribe" },
  { src: superscrypt, srcDark: superscryptDark, alt: "superscrypt" },
  { src: saison, srcDark: saisonDark, alt: "saison" },
  { src: taisu, srcDark: taisuDark, alt: "taisu" },
  { src: ytwo, srcDark: ytwoDark, alt: "ytwo" },
];

const secondRowLogos = [
  { src: shield, srcDark: shieldDark, alt: "shield" },
  { src: neoclassic, srcDark: neoclassicDark, alt: "neoclassic" },
  { src: synthetix, srcDark: synthetixDark, alt: "synthetix" },
  { src: gallet, srcDark: galletDark, alt: "gallet" },
];

// Combined VC logos for mobile
const allVCLogos = [...firstRowLogos, ...secondRowLogos];

const angelLogos = [
  { src: phd, srcDark: phdDark, alt: "phd" },
  { src: blocktower, srcDark: blocktowerDark, alt: "blocktower" },
  { src: milken, srcDark: milkenDark, alt: "milken" },
  { src: wave, srcDark: waveDark, alt: "wave" },
  { src: algorand, srcDark: algorandDark, alt: "algorand" },
  { src: xtream, srcDark: xtreamDark, alt: "xtream" },
  { src: fireblocks, srcDark: fireblocksDark, alt: "fireblocks" },
];

export const PartnersSection: React.FC = () => {
  return (
    <section
      id="partners"
      className="items-center pb-10 w-full  flex flex-col overflow-hidden pt-10 md:pt-20  px-20  max-md:px-5"
    >
      <div className="dark:hidden flex w-full px-4 md:px-17 pt-4 md:pt-12 pb-8 md:pb-16   max-w-[1350px] rounded-2xl flex-col items-stretch relative">
        <TextFade direction="up">
          <h1 className="text-helix-black text-5xl text-center max-md:text-2xl prose-h1:my-0">
            Backed By
          </h1>
        </TextFade>
      </div>

      {/* Light theme */}
      <div className="flex dark:hidden flex-col justify-center items-center">
        {/* Desktop view - separate rows */}
        <div className="hidden md:block w-full">
          {/* First row of VC logos */}
          <div className="w-full">
            <div className="flex flex-row gap-4 justify-center">
              {firstRowLogos.map((logo, index) => (
                <Image key={index} src={logo.src} alt={logo.alt} />
              ))}
            </div>
          </div>
          {/* Second row of VC logos */}
          <div className="w-full mt-4">
            <div className="flex flex-row gap-4 justify-center">
              {secondRowLogos.map((logo, index) => (
                <Image key={index} src={logo.src} alt={logo.alt} />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile view - all VC logos together, 3 per row */}
        <div className="md:hidden flex flex-wrap justify-center items-center gap-4 px-4 w-full">
          {allVCLogos.map((logo, index) => (
            <div
              key={index}
              className="w-[calc(33.333%-16px)] flex justify-center"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                className="w-full h-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 flex dark:hidden w-full px-4 md:px-17  pt-4 md:pt-12  pb-8 md:pb-16   max-w-[1350px] rounded-2xl flex-col items-stretch relative">
        <TextFade direction="up">
          <h1 className="text-helix-black text-5xl text-center max-md:text-2xl">
            Select Angels From
          </h1>
        </TextFade>
      </div>

      {/* Angels row */}
      <div className="flex dark:hidden flex-col justify-center items-center">
        {/* Desktop view */}
        <div className="hidden md:flex flex-row gap-4 justify-center">
          {angelLogos.map((logo, index) => (
            <Image key={index} src={logo.src} alt={logo.alt} />
          ))}
        </div>
        {/* Mobile view - 3 per row */}
        <div className="md:hidden flex flex-wrap justify-center items-center gap-4 px-4 w-full">
          {angelLogos.map((logo, index) => (
            <div
              key={index}
              className="w-[calc(33.333%-16px)] flex justify-center"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                className="w-full h-auto object-contain "
              />
            </div>
          ))}
        </div>
      </div>

      {/* Dark theme */}
      <div className="hidden dark:flex w-full px-4 md:px-17 pt-4 md:pt-12 pb-8 md:pb-16   max-w-[1350px] rounded-2xl flex-col items-stretch relative">
        <TextFade direction="up">
          <h1 className="text-white text-5xl text-center max-md:text-2xl">
            Backed By
          </h1>
        </TextFade>
      </div>

      <div className="hidden dark:flex flex-col justify-center items-center">
        {/* Desktop view - separate rows */}
        <div className="hidden md:block w-full">
          {/* First row of VC logos */}
          <div className="w-full">
            <div className="flex flex-row gap-4 justify-center">
              {firstRowLogos.map((logo, index) => (
                <Image key={index} src={logo.srcDark} alt={logo.alt} />
              ))}
            </div>
          </div>
          {/* Second row of VC logos */}
          <div className="w-full mt-4">
            <div className="flex flex-row gap-4 justify-center">
              {secondRowLogos.map((logo, index) => (
                <Image key={index} src={logo.srcDark} alt={logo.alt} />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile view - all VC logos together, 3 per row */}
        <div className="md:hidden flex flex-wrap justify-center items-center gap-4 px-4 w-full">
          {allVCLogos.map((logo, index) => (
            <div
              key={index}
              className="w-[calc(33.333%-16px)] flex justify-center"
            >
              <Image
                src={logo.srcDark}
                alt={logo.alt}
                className="w-full h-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 hidden dark:flex w-full px-4 md:px-17  pt-4 md:pt-12  pb-8 md:pb-16   max-w-[1350px] rounded-2xl flex-col items-stretch relative">
        <TextFade direction="up">
          <h1 className="text-white text-5xl text-center max-md:text-2xl">
            Select Angels From
          </h1>
        </TextFade>
      </div>

      {/* Angels row - Dark */}
      <div className="hidden dark:flex flex-col justify-center items-center">
        {/* Desktop view */}
        <div className="hidden md:flex flex-row gap-4 justify-center">
          {angelLogos.map((logo, index) => (
            <Image key={index} src={logo.srcDark} alt={logo.alt} />
          ))}
        </div>
        {/* Mobile view - 3 per row */}
        <div className="md:hidden flex flex-wrap justify-center items-center gap-4 px-4 w-full">
          {angelLogos.map((logo, index) => (
            <div
              key={index}
              className="w-[calc(33.333%-16px)] flex justify-center"
            >
              <Image
                src={logo.srcDark}
                alt={logo.alt}
                className="w-full h-auto object-contain max-20"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
