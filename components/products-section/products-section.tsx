import React from "react";
import { ProductHeader } from "./product-header";
import { ProductCard } from "./product-card";
import USHD_Grade from "@/public/images/ushd-grade.svg";
import USHD_Yield from "@/public/images/ushd-yield.svg";
import USHD_Growth from "@/public/images/ushd-growth.svg";

const productData = [
  {
    id: 1,
    imageSrc: USHD_Grade,
    imageAlt: "USHD Stablecoin illustration",
    title: {
      prefix: "USHD",
      suffix: "Stablecoin",
    },
    description:
      "Institutional-Grade Stablecoin. Backed 1:1 by Real World Assets (RWAs) such as US Treasury Bills and/or Money Market Funds.",
  },
  {
    id: 2,
    imageSrc: USHD_Yield,
    imageAlt: "USHD for Yield illustration",
    title: {
      prefix: "USHD",
      suffix: "for Yield",
    },
    description:
      "Sustainable Yields From RWAs. DeFi users can stake USHD, unlocking yield that tracks underlying US Treasury Bills and/or Money Market Funds with no lock-up.",
  },
  {
    id: 3,
    imageSrc: USHD_Growth,
    imageAlt: "USHD for Growth illustration",
    title: {
      prefix: "USHD",
      suffix: "for Growth",
    },
    description:
      "Growth From Private Credit. DeFi users can also stake USHD with a lock-up to enjoy growth in private credit markets.",
  },
];

const headerData = {
  badgeText: "Our Products",
};

export const ProductSection: React.FC = () => {
  return (
    <section
      id="products"
      className="items-center w-full bg-white dark:bg-helix-black flex flex-col overflow-hidden pt-20  px-20  max-md:px-5"
    >
      <div className="flex w-full px-4 md:px-17 pt-12 pb-23  max-w-[1350px] rounded-2xl flex-col items-stretch relative">
        <ProductHeader badgeText={headerData.badgeText} />
        <div className="flex items-stretch justify-center gap-6 flex-wrap mt-4.5 md:mt-[54px]">
          {productData.map((product, index) => (
            <div key={product.id}>
              <ProductCard
                index={index}
                imageSrc={product.imageSrc}
                imageAlt={product.imageAlt}
                title={product.title}
                description={product.description}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
