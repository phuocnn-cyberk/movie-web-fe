import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { useFavouriteList } from "./useFavouriteList";
import { useAddFavourite } from "./useAddFavourite";
import { useRemoveFavourite } from "./useRemoveFavourite";
import { ROUTES } from "@/lib/routes";

export const useMovieInteractions = () => {
  const router = useRouter();
  const { favouriteList } = useFavouriteList();
  const { mutate: addFavorite } = useAddFavourite();
  const { mutate: removeFavorite } = useRemoveFavourite();

  const favoriteMovieIds = useMemo(() => {
    return favouriteList?.map((fav) => fav.movieId) || [];
  }, [favouriteList]);

  const handleMovieClick = (movieId: number) => {
    router.push(ROUTES.movieDetail(movieId));
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
