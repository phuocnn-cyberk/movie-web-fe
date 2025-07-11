import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { MovieDetailHero } from "@/components/movie-detail-hero/movie-detail-hero";
import { MovieDescription } from "@/components/movie-detail-hero/movie-description";
import { MovieInfoSidebar } from "@/components/movie-detail-hero/movie-info-sidebar";
import { MovieReviews } from "@/components/movie-reviews/movie-reviews";

interface MovieDetailPageProps {
  params: {
    id: string;
  };
}

export default function MovieDetailPage({ params }: MovieDetailPageProps) {
  // Movie database - trong thực tế sẽ fetch từ API
  const moviesDB = {
    "1": {
      id: "1",
      title: "Avengers : Endgame",
      description: "With the help of remaining allies, the Avengers must assemble once more in order to undo Thanos's actions and undo the chaos to the universe, no matter what consequences may be in store, and no matter who they face... Avenge the fallen.",
      backgroundImage: "/images/hunter-bg.png",
      year: 2019,
      genre: "Action",
      duration: "3h 1min",
      rating: 8.4
    },
    "2": {
      id: "2",
      title: "Avengers : Infinity War",
      description: "The Avengers and their allies must be willing to sacrifice all in an attempt to defeat the powerful Thanos before his blitz of devastation and ruin puts an end to the universe.",
      backgroundImage: "/images/hunter-bg.png",
      year: 2018,
      genre: "Action",
      duration: "2h 29min",
      rating: 8.4
    },
    "3": {
      id: "3",
      title: "Avengers : Age of Ultron",
      description: "When Tony Stark and Bruce Banner try to jump-start a dormant peacekeeping program called Ultron, things go horribly wrong and it's up to Earth's mightiest heroes to stop the villainous Ultron from enacting his terrible plan.",
      backgroundImage: "/images/hunter-bg.png",
      year: 2015,
      genre: "Action",
      duration: "2h 21min",
      rating: 7.3
    },
    "4": {
      id: "4",
      title: "The Avengers",
      description: "Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.",
      backgroundImage: "/images/hunter-bg.png",
      year: 2012,
      genre: "Action",
      duration: "2h 23min",
      rating: 8.0
    }
  };

  // Get movie data based on ID
  const movieData = moviesDB[params.id as keyof typeof moviesDB] || moviesDB["1"];

  return (
    <div className="w-full min-h-screen overflow-x-hidden dark:bg-[#202020]">
      <Header />
      <main className="w-full dark:bg-[#0F0F0F] pt-[120px]">
        <MovieDetailHero movie={movieData} />
        
        {/* Movie Detail Content - 2 Column Layout */}
        <div className="w-full px-20 py-10">
          <div className="flex gap-5">
            {/* Left Column - Description, Cast, Reviews */}
            <div className="flex-1 flex flex-col">
              <MovieDescription description={movieData.description} />
              {/* Cast section can be added here later */}
              <MovieReviews movieId={params.id} />
            </div>
            
            {/* Right Column - Movie Info Sidebar */}
            <MovieInfoSidebar movie={movieData} />
          </div>
        </div>
        
      </main>
      <Footer />
    </div>
  );
} 