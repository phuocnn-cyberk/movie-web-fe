"use client";
import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  StaggeredAnimation,
  useStaggeredContent,
  useStaggeredImage,
} from "@/components/ui/staggered-animation";

interface ProductCardProps {
  imageSrc: string;
  imageAlt: string;
  title: {
    prefix: string;
    suffix: string;
  };
  description: string;
  className?: string;
  index?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  imageSrc,
  imageAlt,
  title,
  description,
  index = 0,
}) => {
  const contentProps = useStaggeredContent(index);
  const imageProps = useStaggeredImage(index);

  return (
    <StaggeredAnimation index={index} className="flex h-full flex-1">
      <Card
        className={cn(
          "dark:bg-helix-blue-dark w-full max-w-96 flex flex-col max-md:px-0 shadow-[0px_0px_4px_0px_rgba(204,204,204,0.25)]",
          "hover:shadow-[0px_8px_30px_0px_rgba(100,141,185,0.25)] hover:border-helix-blue-light",
          "transition-all duration-300 ease-out",
          "h-full"
        )}
      >
        <CardContent className="flex flex-col h-full py-6 px-8 justify-between">
          <motion.div className="w-full flex-shrink-0" {...imageProps}>
            <Image
              src={imageSrc}
              alt={imageAlt}
              className="object-contain"
              width={320}
            />
          </motion.div>
          <motion.div
            className="w-full flex-col mt-8 flex-grow"
            {...contentProps}
          >
            <h2 className="text-left text-accent text-2xl font-medium">
              <span className="text-helix-black dark:text-white">
                {title.prefix}
              </span>{" "}
              {title.suffix}
            </h2>
            <p className="text-helix-blue dark:text-white text-sm md:text-base font-normal leading-[22px] mt-2">
              {description}
            </p>
          </motion.div>
        </CardContent>
      </Card>
    </StaggeredAnimation>
  );
};
