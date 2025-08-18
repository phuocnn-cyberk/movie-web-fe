"use client";

import { Footer } from "@/components/common/footer";
import { FreeTrial } from "@/components/common/free-trial";
import { Header } from "@/components/common/header";
import { useEffect, useState, useMemo } from "react";
import { getAllMovies, getAllGenres } from "@/services/api";
import { MovieDTO, GenreDTO } from "@/types/api";
import { MovieHeroSection } from "@/components/movie-hero-section/movie-hero-section";
import { MovieGrid } from "@/components/movie-grid/movie-grid";

export default function MoviesShowsPage() {
  const [genres, setGenres] = useState<GenreDTO[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [movies, setMovies] = useState<MovieDTO[]>([]);
  const [loading, setLoading] = useState(false);

  // Search state
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [genreRes, movieRes] = await Promise.all([
          getAllGenres(),
          getAllMovies(),
        ]);
        setGenres(genreRes);
        setMovies(movieRes);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleToggleGenre = (id: number) => {
    setSelectedGenres((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
    setCurrentPage(1); // reset về page 1 khi filter
  };

  // ✅ Filter movies theo genres + searchTerm
  const filteredMovies = useMemo(() => {
    let result = movies;

    // filter theo genres
    if (selectedGenres.length > 0) {
      result = result.filter((m) =>
        m.genres?.some((g) => selectedGenres.includes(g.genreID))
      );
    }

    // filter theo search
    if (searchTerm.trim() !== "") {
      result = result.filter((m) =>
        m.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return result;
  }, [movies, selectedGenres, searchTerm]);

  // Pagination logic
  const totalPages = Math.ceil(filteredMovies.length / pageSize);
  const currentMovies = filteredMovies.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="min-h-screen w-full dark:bg-[#202020]">
      <Header />
      <main className="w-full pt-[120px] dark:bg-[#0F0F0F]">
        {/* Hero Section */}
        <MovieHeroSection />

        {/* Movie Show Page */}
        <section className="px-10 py-16 flex gap-8">
          {/* Left Sidebar */}
          <aside className="w-1/4 space-y-6">
            {/* Search Box */}
            <div>
              <input
                type="text"
                placeholder="Search movies..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // reset về page 1 khi search
                }}
                className="w-full rounded-md bg-[#1A1A1A] p-2 text-white"
              />
            </div>

            {/* Genre Filter */}
            <div>
              <h3 className="mb-2 text-xl font-bold text-white">Genres</h3>
              <div className="flex flex-col gap-2">
                {genres.map((g) => (
                  <label
                    key={g.genreID}
                    className="flex items-center gap-2 text-white"
                  >
                    <input
                      type="checkbox"
                      checked={selectedGenres.includes(g.genreID)}
                      onChange={() => handleToggleGenre(g.genreID)}
                    />
                    {g.name}
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Right Content */}
          <div className="w-3/4 flex flex-col">
            <div className="flex-1">
              {loading ? (
                <p className="text-white">Loading...</p>
              ) : (
                <MovieGrid movies={currentMovies} />
              )}
            </div>

            {/* Pagination */}
            <div className="mt-6 flex justify-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 rounded ${
                    currentPage === i + 1
                      ? "bg-red-600 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </section>

        <FreeTrial />
      </main>
      <Footer />
    </div>
  );
}
