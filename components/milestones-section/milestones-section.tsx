"use client";

import React from "react";
import { MilestonesHeader } from "./milestones-header";
import { useScroll, useTransform } from "motion/react";
import awardImage from "@/public/images/tads-award.svg";
import { GoogleGeminiEffect } from "@/components/ui/google-gemini-effect";
import CountUp from "react-countup";
import Image from "next/image";
import { TextFade } from "@/components/ui/text-fade";

const headerData = {
  badgeText: "Our Milestones & Achievements",
};

export const MilestonesSection: React.FC = () => {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 50%", "end start"],
  });

  const pathLengthFirst = useTransform(scrollYProgress, [0, 0.3], [0.05, 1.2]);
  const pathLengthSecond = useTransform(scrollYProgress, [0, 0.3], [0.1, 1.2]);
  const pathLengthThird = useTransform(scrollYProgress, [0, 0.3], [0.15, 1.2]);
  const pathLengthFourth = useTransform(scrollYProgress, [0, 0.3], [0.2, 1.2]);
  const pathLengthFifth = useTransform(scrollYProgress, [0, 0.3], [0.1, 1.2]);

  return (
    <section
      id="milestones"
      ref={ref}
      className=" overflow-clip relative items-center justify-center w-full flex flex-col  pt-20 pb-20 dark:bg-helix-black dark:text-white "
    >
      {/* Background Effect */}
      <div className="max-xl:hidden z-2 absolute left-0 top-1/2 -translate-y-1/2  w-[200px] dark:w-[650px] h-full bg-[linear-gradient(90deg,#FFFFFF_46.37%,rgba(255,255,255,0.5)_88.47%,rgba(255,255,255,0)_100%)]  dark:bg-[linear-gradient(90deg,#193049_13.07%,rgba(25,48,73,0.5)_90.85%,rgba(25,48,73,0)_102.61%)] translate-x-[-30px] blur-sm "></div>
      <div className="max-xl:hidden z-2 absolute right-0 top-1/2 -translate-y-1/2  w-[200px] dark:w-[650px] h-full bg-[linear-gradient(270deg,#FFFFFF_46.37%,rgba(255,255,255,0.5)_88.47%,rgba(255,255,255,0)_100%)] dark:bg-[linear-gradient(270deg,#193049_13.07%,rgba(25,48,73,0.5)_90.85%,rgba(25,48,73,0)_102.61%)] translate-x-[30px] blur-sm "></div>
      <GoogleGeminiEffect
        pathLengths={[
          pathLengthFirst,
          pathLengthSecond,
          pathLengthThird,
          pathLengthFourth,
          pathLengthFifth,
        ]}
      />

      {/* Content Layer */}
      <div className="relative z-10 w-full  mx-auto flex flex-col items-center">
        <MilestonesHeader badgeText={headerData.badgeText} />

        <div className="hidden dark:block absolute w-full h-full left-0 top-0 pointer-events-none isolate">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 rounded-full -translate-y-[200px] md:-translate-y-[180px] w-[700px] h-[200px] z-3 bg-accent/80 blur-[70px] opacity-40"></div>
        </div>
        {/* Metrics Section */}
        <div className="w-full flex flex-col md:flex-row justify-center items-center py-4 md:py-20 md:gap-2 mt-10 mb-20 gap-y-4">
          <div className="text-center w-[205px] font-montserrat relative z-10">
            <div className="text-4xl md:text-5xl font-semibold text-accent mb-2 dark:text-white">
              <CountUp
                end={500}
                duration={2.3}
                enableScrollSpy
                scrollSpyOnce
                useEasing={true}
                separator=","
              />
              M+
            </div>
            <div className="text-lg text-helix-black dark:text-gray-300">
              Off-chain Deal Volume
            </div>
          </div>

          <div className="text-center w-[205px] font-montserrat relative z-10">
            <div className="text-4xl md:text-5xl font-semibold text-accent mb-2 dark:text-white">
              Zero
            </div>
            <div className="text-lg text-helix-black dark:text-gray-300">
              Defaults
            </div>
          </div>

          <div className="text-center w-[205px] font-montserrat relative z-10">
            <div className="text-4xl md:text-5xl font-semibold text-accent mb-2 dark:text-white">
              <CountUp
                end={400}
                duration={2.3}
                enableScrollSpy
                scrollSpyOnce
                useEasing={true}
                separator=","
              />
              +
            </div>
            <div className="text-lg text-helix-black dark:text-gray-300">
              Deals Closed
            </div>
          </div>
        </div>

        {/* Recognition Section */}
        <div className="text-center w-full">
          <TextFade direction="up">
            <h3 className="text-2xl md:text-3xl text-helix-black dark:text-white mb-8">
              Recognized as Industry Leader
            </h3>
          </TextFade>

          {/* Awards Section */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 relative">
            <div className="text-center relative z-10">
              <Image src={awardImage} alt="award" />
            </div>
            {/* <div className="absolute inset-0 flex items-center overflow-hidden">
              <div className="bg-[linear-gradient(90deg,rgba(49,87,128,0)_0%,#315780_15%,#315780_85%,rgba(49,87,128,0)_100%)] absolute left-1/2 top-1/2 z-2 -translate-x-1/2 -translate-y-1/2 1 w-[280px] dark:w-[350px] h-[89px] blur-md bg-gradient-blue-light dark:bg-[linear-gradient(90deg,rgba(25,48,73,0)_0%,#193049_15%,#193049_85%,rgba(25,48,73,0)_100%)]"></div>
              <div className="award-content whitespace-nowrap animate-ticker flex items-center py-6 gap-10 bg-helix-blue dark:bg-helix-navy">
                {[...Array(10)].map((_, index) => (
                  <span
                    key={index}
                    className="text-[20px] text-white  mx-4 flex flex-row items-center gap-6"
                  >
                    <div className="h-4 w-4 bg-[#62BEC0] rounded-full"></div>
                    Best of Class TADS Tokenized Debt & Bond
                  </span>
                ))}
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};
