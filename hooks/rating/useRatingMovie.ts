import { useMutation } from "@tanstack/react-query";
import { deleteRating, ratingMovie, updateRating } from "@/services/api";
import { queryClient } from "@/configs/query-client.config";
import { Rating } from "@/types/api";
import { toast } from "sonner";

export const useRatingMovie = (movieId: number) => {
  return useMutation({
    mutationFn: (data: Rating) => ratingMovie(data) as Promise<Rating>,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ratings", movieId] });
      toast.success("Review added successfully");
    },
    onError: () => {
      toast.error("Failed to add review");
    },
  });
};

export const useUpdateRating = (movieId: number) => {
  return useMutation({
    mutationFn: ({ ratingId, data }: { ratingId: number; data: Rating }) => 
      updateRating(ratingId, data) as Promise<Rating>,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ratings", movieId] });
      toast.success("Review updated successfully");
    },
    onError: () => {
      toast.error("Failed to update review");
    },
  });
};

export const useDeleteRating = (movieId: number) => {
  return useMutation({
    mutationFn: (ratingId: number) => deleteRating(ratingId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ratings", movieId] });
      toast.success("Review deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete review");
    },
  });
};