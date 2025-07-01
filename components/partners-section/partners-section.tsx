'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from '@/components/ui/carousel';

// Tab 1: Popular Categories
const popularCategories = [
  { 
    name: 'Action', 
    poster: '/images/movie-posters/action-card.png',
    description: 'Heart-pounding adventures and thrilling stunts',
    count: '120+ Movies'
  },
  { 
    name: 'Adventure', 
    poster: '/images/movie-posters/adventure-card.png',
    description: 'Epic journeys and exciting explorations',
    count: '95+ Movies'
  },
  { 
    name: 'Comedy', 
    poster: '/images/movie-posters/comedy-card.png',
    description: 'Laugh-out-loud moments and hilarious stories',
    count: '150+ Movies'
  },
  { 
    name: 'Drama', 
    poster: '/images/movie-posters/drama-card.png',
    description: 'Emotional stories that touch your heart',
    count: '200+ Movies'
  },
  { 
    name: 'Horror', 
    poster: '/images/movie-posters/horror-card.png',
    description: 'Spine-chilling thrills and scary moments',
    count: '80+ Movies'
  },
];

// Tab 2: Trending Now
const trendingCategories = [
  { 
    name: 'Sci-Fi', 
    poster: '/images/movie-posters/action-card.png',
    description: 'Futuristic worlds and advanced technology',
    count: '85+ Movies'
  },
  { 
    name: 'Thriller', 
    poster: '/images/movie-posters/horror-card.png',
    description: 'Suspenseful plots that keep you on edge',
    count: '110+ Movies'
  },
  { 
    name: 'Romance', 
    poster: '/images/movie-posters/drama-card.png',
    description: 'Love stories that warm your heart',
    count: '90+ Movies'
  },
  { 
    name: 'Fantasy', 
    poster: '/images/movie-posters/adventure-card.png',
    description: 'Magical realms and mythical creatures',
    count: '75+ Movies'
  },
  { 
    name: 'Mystery', 
    poster: '/images/movie-posters/drama-card.png',
    description: 'Puzzling plots and intriguing investigations',
    count: '65+ Movies'
  },
];

// Tab 3: New Releases
const newReleases = [
  { 
    name: 'Documentary', 
    poster: '/images/movie-posters/drama-card.png',
    description: 'Real-world stories and factual content',
    count: '45+ Movies'
  },
  { 
    name: 'Animation', 
    poster: '/images/movie-posters/comedy-card.png',
    description: 'Animated adventures for all ages',
    count: '55+ Movies'
  },
  { 
    name: 'Musical', 
    poster: '/images/movie-posters/comedy-card.png',
    description: 'Songs and dances that lift your spirits',
    count: '35+ Movies'
  },
  { 
    name: 'Crime', 
    poster: '/images/movie-posters/action-card.png',
    description: 'Criminal underworld and justice stories',
    count: '70+ Movies'
  },
  { 
    name: 'Biography', 
    poster: '/images/movie-posters/drama-card.png',
    description: 'Real-life stories of remarkable people',
    count: '40+ Movies'
  },
];

// Tab 4: Must Watch
const mustWatch = [
  { 
    name: 'War', 
    poster: '/images/movie-posters/action-card.png',
    description: 'Epic battles and heroic sacrifices',
    count: '50+ Movies'
  },
  { 
    name: 'Western', 
    poster: '/images/movie-posters/adventure-card.png',
    description: 'Wild west adventures and cowboys',
    count: '30+ Movies'
  },
  { 
    name: 'Sports', 
    poster: '/images/movie-posters/drama-card.png',
    description: 'Athletic achievements and team spirit',
    count: '25+ Movies'
  },
  { 
    name: 'Family', 
    poster: '/images/movie-posters/comedy-card.png',
    description: 'Wholesome entertainment for everyone',
    count: '60+ Movies'
  },
  { 
    name: 'History', 
    poster: '/images/movie-posters/drama-card.png',
    description: 'Historical events and period pieces',
    count: '35+ Movies'
  },
];

const allTabs = [
  { name: 'Popular', data: popularCategories },
  { name: 'Trending', data: trendingCategories },
  { name: 'New', data: newReleases },
  { name: 'Must Watch', data: mustWatch },
];

export const PartnersSection: React.FC = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const scrollPrev = () => api?.scrollPrev();
  const scrollNext = () => api?.scrollNext();

  const getCurrentTabData = () => {
    const tabIndex = (current - 1) % allTabs.length;
    return allTabs[tabIndex]?.data || popularCategories;
  };

  const getCurrentTabName = () => {
    const tabIndex = (current - 1) % allTabs.length;
    return allTabs[tabIndex]?.name || 'Popular';
  };

  return (
    <section
      id="categories"
      className="w-full flex flex-col overflow-hidden pt-20 pb-20 px-4 md:px-20"
    >
      <div className="max-w-[1597px] mx-auto w-full flex flex-col gap-20">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-20 lg:gap-25">
          {/* Text Container */}
          <div className="flex flex-col gap-3.5 flex-1">
            <h1 className="text-white font-bold text-4xl md:text-5xl lg:text-[38px] leading-[1.5em] text-left">
              Explore our wide variety of categories
            </h1>
            <p className="text-[#999999] font-normal text-lg leading-[1.5em] text-left">
              Whether you're looking for a comedy to make you laugh, a drama to make you think, or a documentary to learn something new
            </p>
          </div>

          {/* Navigation Controls - Exact Figma Design */}
          <div 
            className="flex items-center gap-4 p-4 rounded-xl"
            style={{ backgroundColor: '#0F0F0F', border: '1px solid #1F1F1F' }}
          >
            {/* Previous Button */}
            <button
              onClick={scrollPrev}
              className="flex items-center justify-center gap-2.5 p-3.5 rounded-lg transition-colors duration-200 disabled:opacity-50"
              style={{ backgroundColor: '#1A1A1A', border: '1px solid #1F1F1F' }}
              disabled={!api?.canScrollPrev()}
            >
              <div className="w-7 h-7 flex items-center justify-center">
                <ChevronLeft 
                  className="text-white" 
                  strokeWidth={2}
                  style={{ width: '17.5px', height: '15.75px' }}
                />
              </div>
            </button>

            {/* Indicators - 4 Tabs */}
            <div className="flex gap-[3px]" style={{ width: '81px' }}>
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="rounded-full transition-all duration-200"
                  style={{
                    height: '4px',
                    backgroundColor: index === (current - 1) % 4 ? '#E50000' : '#333333',
                    width: index === (current - 1) % 4 ? '23px' : 'auto',
                    flex: index === (current - 1) % 4 ? 'none' : '1'
                  }}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={scrollNext}
              className="flex items-center justify-center gap-2.5 p-3.5 rounded-lg transition-colors duration-200 disabled:opacity-50"
              style={{ backgroundColor: '#1A1A1A', border: '1px solid #1F1F1F' }}
              disabled={!api?.canScrollNext()}
            >
              <div className="w-7 h-7 flex items-center justify-center">
                <ChevronRight 
                  className="text-white" 
                  strokeWidth={2}
                  style={{ width: '21px', height: '17.5px' }}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Tab Indicator */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-white text-2xl font-semibold">
              {getCurrentTabName()} Categories
            </h2>
            <div className="w-8 h-px bg-[#E50000]"></div>
          </div>
          <div className="text-[#999999] text-sm">
            Tab {((current - 1) % 4) + 1} of 4
          </div>
        </div>

        {/* Movie Categories Carousel */}
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
            slidesToScroll: 4, // Scroll by 4 tabs (one complete set)
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-[30px]">
            {/* Generate all tabs */}
            {allTabs.map((tab, tabIndex) => 
              tab.data.map((category, categoryIndex) => (
                <CarouselItem 
                  key={`${tab.name}-${category.name}`} 
                  className="pl-[30px] basis-1/5 min-w-0"
                >
                  {/* Card - Exact Figma Design */}
                  <div 
                    className="flex flex-col p-[30px] rounded-xl hover:border-[#3A3A3A] transition-all duration-300 h-full group cursor-pointer"
                    style={{ backgroundColor: '#1A1A1A', border: '1px solid #262626' }}
                  >
                    {/* Container - Height 252px */}
                    <div className="flex flex-col gap-1.25 relative overflow-hidden rounded-lg" style={{ height: '252px' }}>
                      {/* Movie Poster - Full Size */}
                      <div className="w-full h-full relative rounded-[10px] overflow-hidden">
                        <Image
                          src={category.poster}
                          alt={`${category.name} movies`}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          priority={tabIndex === 0 && categoryIndex < 3}
                        />
                      </div>

                      {/* Gradient Overlay Bottom - Exact Figma Specs */}
                      <div 
                        className="absolute bottom-0 left-0 right-0 rounded-lg pointer-events-none"
                        style={{
                          height: '252px',
                          width: '237px',
                          marginLeft: '-1px',
                          background: 'linear-gradient(180deg, rgba(26, 26, 26, 0) 0%, rgba(26, 26, 26, 1) 100%)'
                        }}
                      />

                      {/* Category Badge */}
                      <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full">
                        <span className="text-xs font-medium text-gray-300">
                          {category.count}
                        </span>
                      </div>

                      {/* Tab Indicator on Card */}
                      <div className="absolute top-4 right-4 px-2 py-1 bg-[#E50000]/80 backdrop-blur-sm rounded-full">
                        <span className="text-xs font-medium text-white">
                          {tab.name}
                        </span>
                      </div>
                    </div>

                    {/* Container - Category Info */}
                    <div className="flex items-center justify-between mt-0">
                      <div className="flex flex-col flex-1">
                        <h3 
                          className="text-white text-left"
                          style={{ 
                            fontFamily: 'Manrope', 
                            fontWeight: 600, 
                            fontSize: '18px', 
                            lineHeight: '1.5em' 
                          }}
                        >
                          {category.name}
                        </h3>
                        <p className="text-[#999999] text-sm mt-1">
                          {category.description}
                        </p>
                      </div>
                      
                      {/* Icon - Exact Figma Specs */}
                      <div className="w-[30px] h-[30px] flex items-center justify-center">
                        <ChevronRight 
                          className="text-white group-hover:translate-x-1 transition-transform duration-200" 
                          strokeWidth={2}
                          style={{ width: '18.75px', height: '16.88px' }}
                        />
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))
            )}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};
