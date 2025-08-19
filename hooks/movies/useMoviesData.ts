import { useMemo } from "react";
import { useGetMovies } from "./useGetMovies";
import { useGetGenres } from "./useGetGenres";
import { useFavouriteList } from "../favourite/useFavouriteList";
import { Favorite, Movie } from "@/types/api";

export const useMoviesData = () => {
  const { data: moviesData, isLoading: moviesLoading, error: moviesError } = useGetMovies();
  const { data: genresData, isLoading: genresLoading, error: genresError } = useGetGenres();
  const { favouriteList: favoriteListData, isLoading: favoritesLoading, error: favoritesError } = useFavouriteList();

  const movies = useMemo(() => moviesData || [], [moviesData]);
  const genres = useMemo(() => genresData || [], [genresData]);

  const favoriteMovieIds = useMemo(() => {
    return favoriteListData?.filter((fav) => fav && fav.movieId).map((fav: Favorite) => fav.movieId) || [];
  }, [favoriteListData]);

  const favoriteMovies: Movie[] = useMemo(() => {
    return movies.filter((movie: Movie) => favoriteMovieIds.includes(movie.movieID));
  }, [movies, favoriteMovieIds]);

  const genresList = useMemo(() => {
    const uniqueGenres = ["All", ...genres.map((genre) => genre.name)];
    return uniqueGenres;
  }, [genres]);

  return {
    movies,
    genres,
    favoriteMovieIds,
    favoriteMovies,
    genresList,
    isLoading: moviesLoading || genresLoading || favoritesLoading,
    error: moviesError || genresError || favoritesError,
  };
};
