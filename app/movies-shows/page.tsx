"use client";

import { Footer } from "@/components/common/footer";
import { FreeTrial } from "@/components/common/free-trial";
import { Header } from "@/components/common/header";
import { MovieHeroSection } from "@/components/movie-hero-section/movie-hero-section";
import { Suspense } from "react";
import GenreFilter from "./genre-filter";

export default function MoviesShowsPage() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden dark:bg-[#202020]">
      <Header />
      <MovieHeroSection />
      <main className="w-full dark:bg-[#0F0F0F]">
        <section className="px-20 py-16 pt-10">
          <Suspense fallback={<div>Loading genres...</div>}>
            <GenreFilter />
          </Suspense>
        </section>
        <FreeTrial />
      </main>
      <Footer />
    </div>
  );
}
