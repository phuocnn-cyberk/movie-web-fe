import { MovieHeroSection } from "@/components/movie-hero-section/movie-hero-section";
import { MovieGrid } from "@/components/movie-grid/movie-grid";
import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { FreeTrial } from "@/components/common/free-trial";
import { TopGenresSection } from "@/components/top-genres-section/top-genres-section";
import { TrendingSection } from "@/components/trending-section/trending-section";
import { NewReleasesSection } from "@/components/new-releases-section/new-releases-section";
import { MustWatchSection } from "@/components/must-watch-section/must-watch-section";

export default function MoviesShowsPage() {
  const featuredMovies = [
    { id: 1, title: "Avengers: Endgame", genre: "Action", year: 2019, rating: 8.4, image: "/images/movie-posters/action-card.png" },
    { id: 2, title: "The Dark Knight", genre: "Action", year: 2008, rating: 9.0, image: "/images/movie-posters/action-card.png" },
    { id: 3, title: "Inception", genre: "Drama", year: 2010, rating: 8.8, image: "/images/movie-posters/drama-card.png" },
    { id: 4, title: "Interstellar", genre: "Adventure", year: 2014, rating: 8.6, image: "/images/movie-posters/adventure-card.png" },
    { id: 5, title: "Stranger Things", genre: "Horror", year: 2016, rating: 8.7, image: "/images/movie-posters/horror-card.png" },
  ];

  return (
    <div className="w-full min-h-screen overflow-x-hidden dark:bg-[#202020]">
      <Header />
      <main className="w-full dark:bg-[#0F0F0F] pt-[120px]">
        <MovieHeroSection />
        
        <section className="px-20 py-16">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-[Manrope]">
              Our Genres
            </h2>
            <p className="text-[#999999] text-lg font-[Manrope]">
              Explore our diverse collection of movies and shows from action, horror, and more
            </p>
          </div>
          
          <MovieGrid movies={featuredMovies} />
        </section>

        <TopGenresSection />

        <TrendingSection />

        <NewReleasesSection />

        <MustWatchSection />

        <FreeTrial />
      </main>
      <Footer />
    </div>
  );
} 