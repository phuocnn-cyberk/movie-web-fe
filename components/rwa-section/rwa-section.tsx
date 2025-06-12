"use client";

import React from "react";
import { motion } from "motion/react";
import { RWAHeader } from "./rwa-header";
import Image from "next/image";
import { SequentialAnimation } from "@/components/ui/staggered-animation";
import defiImage from "@/public/images/defi-stack.svg";
import offImage from "@/public/images/off-chain-stack.svg";
import tradfiImage from "@/public/images/tradfi-stack.svg";

const headerData = {
  badgeText: "The HELIX Difference",
};

const contentBlocks = [
  {
    title: "RWAS SECURED OFF-CHAIN",
    description:
      "Although USHD is a purely on-chain stablecoin, the Real World Assets, such as the Money Market Funds that back USHD exist entirely off-chain, ensuring that there are no on-chain honeypots for hackers.",
    image: offImage,
  },
  {
    title: "COMPOSABLE WITH DEFI",
    description:
      "The versatility of DeFi, without the unpredictability. Because HELIX owns and operates the entire USHD stack, users can access the full spectrum of DeFi composability, with with the security of off-chain RWAs.",
    image: defiImage,
  },
  {
    title: "THE CONFIDENCE OF TRADFI RWAS",
    description:
      "Collateralized by regulated, and compliant RWAs, USHD is a dollar-pegged stablecoin, backed by the safety and security of off-chain RWAs, with the composability and versatility of on-chain applications.",
    image: tradfiImage,
  },
];

export const RWASection: React.FC = () => {
  return (
    <section className="items-center w-full  flex flex-col overflow-hidden pt-20 pb-6 px-20 max-md:px-5 dark:bg-helix-black">
      <div className="flex max-w-[1350px] w-full px-4 md:px-17 py-10  rounded-2xl flex-col items-stretch relative">
        <div className="flex flex-row justify-between">
          <RWAHeader badgeText={headerData.badgeText} />

          {/* Additional text on the right side above images */}
          <div className="hidden xl:flex flex-col text-center items-center justify-center  w-[503px] z-10">
            <motion.h3
              className="text-accent  text-lg mb-4 tracking-wide"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              USHD, THE INSTITUTIONAL-GRADE STABLECOIN
            </motion.h3>
            <motion.p
              className="text-helix-blue dark:text-gray-300 text-xs w-full max-w-[503px] text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              Unlike other stablecoin issuers, which hypothecate US Treasury
              Bill tokens, exposing these backing assets to hacks and other
              on-chain vulnerabilities, USHD is backed by actual US Treasury
              Bills and Money Market Funds, creating secure off-chain
              cash-equivalents.
            </motion.p>
          </div>
        </div>

        {/* Additional text on the right side above images - Mobile */}
        <div className="flex xl:hidden flex-col text-center items-center mt-8 justify-center mx-auto w-full max-w-[503px] z-10">
          <motion.h3
            className="text-accent  text-lg mb-4 tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.4 }}
          >
            USHD, THE INSTITUTIONAL-GRADE STABLECOIN
          </motion.h3>
          <motion.p
            className="text-helix-blue dark:text-gray-300 text-xs w-full max-w-[503px] text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.75, duration: 0.4 }}
          >
            Unlike other stablecoin issuers, which hypothecate US Treasury Bill
            tokens, exposing these backing assets to hacks and other on-chain
            vulnerabilities, USHD is backed by actual US Treasury Bills and
            Money Market Funds, creating secure off-chain cash-equivalents.
          </motion.p>
        </div>

        {/* Mobile images */}
        <div className="xl:hidden flex justify-center mx-auto w-full translate-y-[-50px]">
          <div className="flex flex-col  gap-8">
            {contentBlocks.map((block, index) => (
              <motion.div
                key={index}
                className="h-[70px] block xl:hidden w-full"
                style={{
                  position: "relative",
                  zIndex: contentBlocks.length - index,
                }}
                custom={index}
                variants={{
                  hidden: { opacity: 0, scale: 0.8, x: 30 },
                  visible: (i: number) => ({
                    opacity: 1,
                    scale: 1,
                    x: 0,
                    transition: {
                      delay: i * 0.15 + 0.3,
                      duration: 0.4,
                      type: "spring",
                      stiffness: 120,
                    },
                  }),
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Image
                  className="w-full max-w-[400px]"
                  src={block.image}
                  alt="defi"
                />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex 2xl:flex-row flex-col  items-start gap-16 mt-60  max-lg:flex-col max-lg:gap-8 relative z-10">
          {/* Content Blocks - Left Side */}
          <div className="flex flex-col flex-1 space-y-8 w-full justify-between md:pb-32">
            {contentBlocks.map((block, index) => (
              <SequentialAnimation key={index} index={index}>
                <div className="flex flex-col md:flex-row items-start w-full justify-between md:gap-28">
                  <motion.div
                    className="flex-1"
                    custom={index}
                    variants={{
                      hidden: { opacity: 0, x: -30 },
                      visible: (i: number) => ({
                        opacity: 1,
                        x: 0,
                        transition: {
                          delay: i * 0.15 + 0.2,
                          duration: 0.35,
                          ease: "easeOut",
                        },
                      }),
                    }}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <h3 className="text-accent text-lg mb-3 tracking-wide">
                      {block.title}
                    </h3>
                    <p className="text-helix-blue dark:text-gray-300 text-xs w-full md:w-[420px] leading-relaxed">
                      {block.description}
                    </p>
                  </motion.div>
                  <div
                    className="flex translate-y-5 order-first md:order-last"
                    style={{
                      position: "relative",
                      zIndex: contentBlocks.length - index,
                    }}
                  >
                    <motion.div
                      className="2xl:flex items-center hidden my-auto mr-14"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: index * 0.15 + 0.45,
                        duration: 0.3,
                      }}
                    >
                      <div className="h-17 w-[1px] border-r border-dashed border-helix-blue-light"></div>
                      <div className="w-44 h-[1px] border-b border-dashed border-helix-blue-light"></div>
                      <div className="w-1.5 h-1.5 bg-helix-blue-light rounded-full"></div>
                    </motion.div>
                    <motion.div
                      className="h-[99px] hidden xl:block w-full translate-y-[-170px]"
                      custom={index}
                      variants={{
                        hidden: { opacity: 0, scale: 0.8, x: 30 },
                        visible: (i: number) => ({
                          opacity: 1,
                          scale: 1,
                          x: 0,
                          transition: {
                            delay: i * 0.15 + 0.3,
                            duration: 0.4,
                            type: "spring",
                            stiffness: 120,
                          },
                        }),
                      }}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                    >
                      <Image className="" src={block.image} alt="defi" />
                    </motion.div>
                  </div>
                </div>
              </SequentialAnimation>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
