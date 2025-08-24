"use client";

import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { useMoviesData } from "@/hooks/movies/useMoviesData";
import { ROUTES } from "@/lib/routes";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

const getGenreDescription = (genreName: string): string => {
  const descriptions: { [key: string]: string } = {
    Action:
      "The action genre is a genre of film and television that focuses on physical conflict and physical violence.",
    Adventure:
      "The adventure genre is a genre of film and television that focuses on physical conflict and physical violence.",
    Comedy:
      "The comedy genre is a genre of film and television that focuses on physical conflict and physical violence.",
    Drama: "The drama genre is a genre of film and television that focuses on physical conflict and physical violence.",
    Horror:
      "The horror genre is a genre of film and television that focuses on physical conflict and physical violence.",
    "Sci-Fi":
      "The science fiction genre is a genre of film and television that focuses on physical conflict and physical violence.",
    Thriller:
      "The thriller genre is a genre of film and television that focuses on physical conflict and physical violence.",
    Romance:
      "The romance genre is a genre of film and television that focuses on physical conflict and physical violence.",
    Fantasy:
      "The fantasy genre is a genre of film and television that focuses on physical conflict and physical violence.",
    Mystery:
      "The mystery genre is a genre of film and television that focuses on physical conflict and physical violence.",
    Documentary:
      "The documentary genre is a genre of film and television that focuses on physical conflict and physical violence.",
    Animation:
      "The animation genre is a genre of film and television that focuses on physical conflict and physical violence.",
    Musical:
      "The musical genre is a genre of film and television that focuses on physical conflict and physical violence.",
    Crime: "The crime genre is a genre of film and television that focuses on physical conflict and physical violence.",
    Biography:
      "The biography genre is a genre of film and television that focuses on physical conflict and physical violence.",
    War: "The war genre is a genre of film and television that focuses on physical conflict and physical violence.",
    Western:
      "The western genre is a genre of film and television that focuses on physical conflict and physical violence.",
    Sports:
      "The sports genre is a genre of film and television that focuses on physical conflict and physical violence.",
    Family:
      "The family genre is a genre of film and television that focuses on physical conflict and physical violence.",
    History:
      "The history genre is a genre of film and television that focuses on physical conflict and physical violence.",
  };
  return descriptions[genreName] || "Khám phá thể loại phim đặc sắc này";
};

export const CategoriesSection: React.FC = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const router = useRouter();

  const { movies, genres, isLoading, error } = useMoviesData();

  const allTabs = useMemo(() => {
    if (!genres.length || !movies.length) {
      return [
        { name: "Popular", data: [] },
        { name: "Trending", data: [] },
        { name: "New", data: [] },
        { name: "Must Watch", data: [] },
      ];
    }

    const genreStats = genres.map((genre) => {
      const genreMovies = movies.filter((movie) => movie.genres?.some((g) => g.genreID === genre.genreID));

      const representativeMovie = genreMovies[0];
      const poster = representativeMovie?.poster || "/images/movie-posters/action-card.png";

      return {
        name: genre.name,
        poster: poster,
        description: getGenreDescription(genre.name),
        count: `${genreMovies.length}+ Phim`,
        genreId: genre.genreID,
      };
    });

    const tabSize = Math.ceil(genreStats.length / 4);
    const tabs = [];

    for (let i = 0; i < 4; i++) {
      const startIndex = i * tabSize;
      const endIndex = Math.min(startIndex + tabSize, genreStats.length);
      const tabData = genreStats.slice(startIndex, endIndex);

      const tabNames = ["Popular", "Trending", "New", "Must Watch"];
      tabs.push({
        name: tabNames[i],
        data: tabData,
      });
    }

    return tabs;
  }, [genres, movies]);

  const handleCategoryClick = (genreName: string) => {
    router.push(`${ROUTES.moviesShows}?genre=${encodeURIComponent(genreName)}`);
  };

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const scrollPrev = () => api?.scrollPrev();
  const scrollNext = () => api?.scrollNext();

  const getCurrentTabName = () => {
    const tabIndex = (current - 1) % allTabs.length;
    return allTabs[tabIndex]?.name || "Popular";
  };

  if (isLoading) {
    return (
      <section
        id="categories"
        className="flex w-full flex-col overflow-hidden px-4 pt-20 pb-20 md:px-20 dark:bg-[#0F0F0F]"
      >
        <div className="mx-auto flex w-full max-w-[1597px] items-center justify-center">
          <div className="text-lg text-white">Đang tải danh mục...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section
        id="categories"
        className="flex w-full flex-col overflow-hidden px-4 pt-20 pb-20 md:px-20 dark:bg-[#0F0F0F]"
      >
        <div className="mx-auto flex w-full max-w-[1597px] items-center justify-center">
          <div className="text-lg text-red-500">Lỗi khi tải danh mục: {error.message}</div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="categories"
      className="flex w-full flex-col overflow-hidden px-4 pt-20 pb-20 md:px-20 dark:bg-[#0F0F0F]"
    >
      <div className="mx-auto flex w-full max-w-[1597px] flex-col gap-20">
        <div className="flex flex-col gap-20 lg:flex-row lg:items-end lg:justify-between lg:gap-25">
          <div className="flex flex-1 flex-col gap-3.5">
            <h1 className="text-left text-4xl leading-[1.5em] font-bold text-white md:text-5xl lg:text-[38px]">
              Explore our wide variety of categories
            </h1>
            <p className="text-left text-lg leading-[1.5em] font-normal text-[#999999]">
              Whether you&apos;re looking for a comedy to make you laugh, a drama to make you think, or a documentary to
              learn something new
            </p>
          </div>

          <div
            className="flex items-center gap-4 rounded-xl p-4"
            style={{ backgroundColor: "#0F0F0F", border: "1px solid #1F1F1F" }}
          >
            <button
              onClick={scrollPrev}
              className="flex items-center justify-center gap-2.5 rounded-lg p-3.5 transition-colors duration-200 disabled:opacity-50"
              style={{ backgroundColor: "#1A1A1A", border: "1px solid #1F1F1F" }}
              disabled={!api?.canScrollPrev()}
            >
              <div className="flex h-7 w-7 items-center justify-center">
                <ChevronLeft className="text-white" strokeWidth={2} style={{ width: "17.5px", height: "15.75px" }} />
              </div>
            </button>

            <div className="flex gap-[3px]" style={{ width: "81px" }}>
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="rounded-full transition-all duration-200"
                  style={{
                    height: "4px",
                    backgroundColor: index === (current - 1) % 4 ? "#E50000" : "#333333",
                    width: index === (current - 1) % 4 ? "23px" : "auto",
                    flex: index === (current - 1) % 4 ? "none" : "1",
                  }}
                />
              ))}
            </div>

            <button
              onClick={scrollNext}
              className="flex items-center justify-center gap-2.5 rounded-lg p-3.5 transition-colors duration-200 disabled:opacity-50"
              style={{ backgroundColor: "#1A1A1A", border: "1px solid #1F1F1F" }}
              disabled={!api?.canScrollNext()}
            >
              <div className="flex h-7 w-7 items-center justify-center">
                <ChevronRight className="text-white" strokeWidth={2} style={{ width: "21px", height: "17.5px" }} />
              </div>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-semibold text-white">{getCurrentTabName()} Categories</h2>
            <div className="h-px w-8 bg-[#E50000]"></div>
          </div>
          <div className="text-sm text-[#999999]">Tab {((current - 1) % 4) + 1} of 4</div>
        </div>

        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
            slidesToScroll: 4,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-[30px]">
            {allTabs.map((tab, tabIndex) =>
              tab.data.map((category, categoryIndex) => (
                <CarouselItem key={`${tab.name}-${category.name}`} className="min-w-0 basis-1/5 pl-[30px]">
                  <div
                    className="group flex h-full cursor-pointer flex-col rounded-xl p-[30px] transition-all duration-300 hover:border-[#3A3A3A]"
                    style={{ backgroundColor: "#1A1A1A", border: "1px solid #262626" }}
                    onClick={() => handleCategoryClick(category.name)}
                  >
                    <div
                      className="relative flex flex-col gap-1.25 overflow-hidden rounded-lg"
                      style={{ height: "252px" }}
                    >
                      <div className="relative h-full w-full overflow-hidden rounded-[10px]">
                        <Image
                          src={category.poster}
                          alt={`${category.name} movies`}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          priority={tabIndex === 0 && categoryIndex < 3}
                        />
                      </div>

                      <div
                        className="pointer-events-none absolute right-0 bottom-0 left-0 rounded-lg"
                        style={{
                          height: "252px",
                          width: "237px",
                          marginLeft: "-1px",
                          background: "linear-gradient(180deg, rgba(26, 26, 26, 0) 0%, rgba(26, 26, 26, 1) 100%)",
                        }}
                      />

                      <div className="absolute top-4 left-4 rounded-full bg-black/60 px-3 py-1 backdrop-blur-sm">
                        <span className="text-xs font-medium text-gray-300">{category.count}</span>
                      </div>

                      <div className="absolute top-4 right-4 rounded-full bg-[#E50000]/80 px-2 py-1 backdrop-blur-sm">
                        <span className="text-xs font-medium text-white">{tab.name}</span>
                      </div>
                    </div>

                    <div className="mt-0 flex items-center justify-between">
                      <div className="flex flex-1 flex-col">
                        <h3
                          className="text-left text-white"
                          style={{
                            fontFamily: "Manrope",
                            fontWeight: 600,
                            fontSize: "18px",
                            lineHeight: "1.5em",
                          }}
                        >
                          {category.name}
                        </h3>
                        <p className="mt-1 text-sm text-[#999999]">{category.description}</p>
                      </div>

                      <div className="flex h-[30px] w-[30px] items-center justify-center">
                        <ChevronRight
                          className="text-white transition-transform duration-200 group-hover:translate-x-1"
                          strokeWidth={2}
                          style={{ width: "18.75px", height: "16.88px" }}
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
