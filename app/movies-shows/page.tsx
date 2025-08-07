"use client";

import { Footer } from "@/components/common/footer";
import { FreeTrial } from "@/components/common/free-trial";
import { Header } from "@/components/common/header";
import { MovieGrid } from "@/components/movie-grid/movie-grid";
import { MovieHeroSection } from "@/components/movie-hero-section/movie-hero-section";
import { useState } from "react";

export default function MoviesShowsPage() {
  const [selectedGenre, setSelectedGenre] = useState("All");

  const featuredMovies = [
    {
      id: 1,
      title: "Avengers: Endgame",
      genre: "Action",
      year: 2019,
      rating: 8.4,
      image: "/images/movie-posters/action-card.png",
    },
    {
      id: 2,
      title: "The Dark Knight",
      genre: "Action",
      year: 2008,
      rating: 9.0,
      image: "/images/movie-posters/action-card.png",
    },
    {
      id: 3,
      title: "Inception",
      genre: "Drama",
      year: 2010,
      rating: 8.8,
      image: "/images/movie-posters/drama-card.png",
    },
    {
      id: 4,
      title: "Interstellar",
      genre: "Adventure",
      year: 2014,
      rating: 8.6,
      image: "/images/movie-posters/adventure-card.png",
    },
    {
      id: 5,
      title: "Stranger Things",
      genre: "Horror",
      year: 2016,
      rating: 8.7,
      image: "/images/movie-posters/horror-card.png",
    },
    {
      id: 6,
      title: "Avengers: Endgame",
      genre: "Action",
      year: 2019,
      rating: 8.4,
      image: "/images/movie-posters/action-card.png",
    },
    {
      id: 7,
      title: "The Dark Knight",
      genre: "Action",
      year: 2008,
      rating: 9.0,
      image: "/images/movie-posters/action-card.png",
    },
    {
      id: 8,
      title: "Inception",
      genre: "Drama",
      year: 2010,
      rating: 8.8,
      image: "/images/movie-posters/drama-card.png",
    },
    {
      id: 9,
      title: "Interstellar",
      genre: "Adventure",
      year: 2014,
      rating: 8.6,
      image: "/images/movie-posters/adventure-card.png",
    },
    {
      id: 10,
      title: "Stranger Things",
      genre: "Horror",
      year: 2016,
      rating: 8.7,
      image: "/images/movie-posters/horror-card.png",
    },
  ];

  const genres = ["All", "Action", "Drama", "Adventure", "Horror"];

  const filteredMovies =
    selectedGenre === "All" ? featuredMovies : featuredMovies.filter((movie) => movie.genre === selectedGenre);

  return (
    <div className="min-h-screen w-full overflow-x-hidden dark:bg-[#202020]">
      <Header />
      <main className="w-full pt-[120px] dark:bg-[#0F0F0F]">
        <MovieHeroSection />

        <section className="px-20 py-16">
          <div className="mb-12">
            <h2 className="mb-4 font-[Manrope] text-3xl font-bold text-white md:text-4xl">Our Genres</h2>
            <p className="font-[Manrope] text-lg text-[#999999]">
              Explore our diverse collection of movies and shows from action, horror, and more
            </p>
          </div>

          <div className="mb-8 flex flex-wrap gap-4">
            {genres.map((genre) => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`rounded-full border px-4 py-2 transition ${
                  selectedGenre === genre
                    ? "bg-white text-black"
                    : "border-white text-white hover:bg-white hover:text-black"
                }`}
              >
                {genre}
              </button>
            ))}
          </div>

          <MovieGrid movies={filteredMovies} />
        </section>

        <FreeTrial />
      </main>
      <Footer />
    </div>
  );
}
