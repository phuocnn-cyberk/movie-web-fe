// import React, { useState } from "react";
import { SpotlightHeader } from "./spotlight-header";
import { SpotlightCard } from "./spotlight-card";
// import { Button } from "../ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import helixImpact from "@/public/images/helix-impact.png";
import helixPartner from "@/public/images/helix-partners.png";
import helixToken from "@/public/images/helix-token.png";

const headerData = {
  badgeText: "Latest News",
  titleText: "Helix in the Spotlight",
};

interface NewsItem {
  id: string;
  imageUrl: string;
  date: string;
  title: string;
}

export const SpotlightSection: React.FC = () => {
  // const [isExploring, setIsExploring] = useState(false);

  const newsItems: NewsItem[] = [
    {
      id: "1",
      imageUrl: helixImpact.src,
      date: "May 25 2025",
      title:
        "Top up Helix and drive real impact on how rewards are distributed",
    },
    {
      id: "2",
      imageUrl: helixPartner.src,
      date: "May 25 2025",
      title:
        "We are excited to partner with Ozean by Clearpool to bring $100+ million in private credit...",
    },
    {
      id: "3",
      imageUrl: helixToken.src,
      date: "May 25 2025",
      title:
        "Top up Helix and drive real impact on how rewards are distributed",
    },
    {
      id: "4",
      imageUrl: helixImpact.src,
      date: "May 25 2025",
      title:
        "Top up Helix and drive real impact on how rewards are distributed",
    },
    {
      id: "5",
      imageUrl: helixPartner.src,
      date: "May 25 2025",
      title:
        "We are excited to partner with Ozean by Clearpool to bring $100+ million in private credit...",
    },
    {
      id: "6",
      imageUrl: helixToken.src,
      date: "May 25 2025",
      title:
        "Top up Helix and drive real impact on how rewards are distributed",
    },
  ];

  // const handleExploreMore = () => {
  //   setIsExploring(true);
  //   setTimeout(() => setIsExploring(false), 1000);
  //   console.log("Exploring more news...");
  // };

  return (
    <section
      id="blogs"
      className="items-center w-full  flex flex-col overflow-hidden pt-20 md:px-20 dark:bg-helix-black"
    >
      <div className="max-md:w-full w-full max-w-[1200px] mx-auto flex flex-col md:items-center md:justify-center">
        <Carousel
          opts={{
            align: "start",
            loop: false,
            slidesToScroll: 1,
          }}
          className="w-full"
        >
          {/* Header with navigation buttons on the right */}
          <div className="flex w-full items-end justify-between px-4 mb-[45px] max-md:mb-10">
            <SpotlightHeader
              badgeText={headerData.badgeText}
              titleText={headerData.titleText}
            />
            <div className="flex items-center gap-2 pb-2">
              <CarouselPrevious className="relative left-auto right-auto top-auto translate-x-0 translate-y-0" />
              <CarouselNext className="relative left-auto right-auto top-auto translate-x-0 translate-y-0" />
            </div>
          </div>

          <div className="w-full max-md:p-4 relative">
            <CarouselContent className="flex  pb-4">
              {newsItems.map((item) => (
                <CarouselItem
                  key={item.id}
                  className="basis-1/1 sm:basis-1/2 lg:basis-1/3 min-w-0"
                >
                  <SpotlightCard
                    imageUrl={item.imageUrl}
                    date={item.date}
                    title={item.title}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </div>
        </Carousel>

        {/* <Button
          className={`text-white self-center min-h-11 gap-2 text-base mt-8 px-4 py-[13px] rounded-[100px] transition-all duration-200 ${
            isExploring
              ? "bg-accent-active scale-95"
              : "bg-accent hover:bg-accent-hover hover:scale-105"
          }`}
          onClick={handleExploreMore}
          disabled={isExploring}
          aria-label="Explore more news articles"
          variant="default"
        >
          {isExploring ? "Loading..." : "Explore More"}
        </Button> */}
      </div>
    </section>
  );
};
