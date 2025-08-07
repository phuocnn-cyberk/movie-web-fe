"use client";

import { Header } from "@/components/common/header";
import { useFavouriteList } from "@/hooks/favourite/useFavouriteList";

export default function FavoritesPage() {
  const { favouriteList, isLoading, error } = useFavouriteList();
  console.log(favouriteList);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <main className="min-h-screen w-full bg-[#0F0F0F] pt-[120px]">
      <Header />
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold">Favorites</h1>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {favouriteList?.map((favourite) => (
            <div key={favourite.favoriteId}>
              {/* <Image src={favourite.movieId} alt={favourite.movieId} width={100} height={100} /> */}
              <h2 className="text-lg font-bold">{favourite.movieId}</h2>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
