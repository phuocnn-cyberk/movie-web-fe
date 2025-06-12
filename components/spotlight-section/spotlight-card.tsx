import Image from "next/image";
import React from "react";
interface SpotlightCardProps {
  imageUrl: string;
  date: string;
  title: string;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  imageUrl,
  date,
  title,
}) => {
  return (
    <article
      className="border-1 h-full  dark:border-helix-blue shadow-[4px_4px_0px_0px_rgba(0,0,0,0.10)]  mx-auto max-w-[384px] w-full bg-helix-blue-dark  pt-3 pb-4 md:pb-9 px-3 rounded-2xl border-solid cursor-pointer hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.15)] transition-shadow duration-200"
      role="button"
      tabIndex={0}
      aria-label={`Read article: ${title}`}
    >
      <Image
        width={365}
        height={223}
        src={imageUrl}
        alt=""
        className="aspect-[1.65] object-contain bg-blend-luminosity max-w-full rounded-xl"
      />
      <div className="w-full mt-[26px] px-4">
        <time
          className="text-[#86AED9] text-base tracking-[0.16px]"
          dateTime={date}
        >
          {date}
        </time>
        <h3 className="text-white text-base md:text-xl leading-6 tracking-[0.2px] mt-4">
          {title}
        </h3>
      </div>
    </article>
  );
};
