import {Banner} from "@/components/movie-show/Banner";
import { GenreSection } from "@/components/movie-show/GenreSection";
import { MovieCarousel } from "@/components/movie-show/MovieCarousel";
import { TrialBanner } from "./TrialBanner";

export function MovieShow(){
    return (
        <div>
            <Banner />
            <GenreSection />
            <MovieCarousel title="Popular Top 10 In Genres" />
            <MovieCarousel title="Trending Now" />
            <MovieCarousel title="New Releases" />
            <MovieCarousel title="Must-Watch Movies" />
            <TrialBanner/>
        </div>
    )
}