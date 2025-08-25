import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { useFavouriteList } from "./useFavouriteList";
import { useAddFavourite } from "./useAddFavourite";
import { useRemoveFavourite } from "./useRemoveFavourite";

export const useMovieInteractions = () => {
  const router = useRouter();
  const { favouriteList } = useFavouriteList();
  const { mutate: addFavorite } = useAddFavourite();
  const { mutate: removeFavorite } = useRemoveFavourite();

  const favoriteMovieIds = useMemo(() => {
    return favouriteList?.map((fav) => fav.movieId) || [];
  }, [favouriteList]);

  const handleMovieClick = (movieId: number) => {
    router.push(`/movie/${movieId}`);
  };

  const handleToggleFavorite = (movieId: number) => {
    const isFavorite = favoriteMovieIds.includes(movieId);
    if (isFavorite) {
      removeFavorite(movieId);
    } else {
      addFavorite(movieId);
    }
  };

  return {
    favoriteMovieIds,
    handleMovieClick,
    handleToggleFavorite,
  };
};
